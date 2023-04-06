import axios from "axios";
import * as cheerio from "cheerio";
import {database} from "../../database/database";
import {CopyImageToS3} from "./s3";

export async function crwalAcacon(arcaConId : number, database : database) {

    const request = await requestArcaconPage(arcaConId)

    if(request.statusCode == 404){
        database.crawled.push({
            arcaConId: arcaConId,
            isDeleted : true,
            title : "",
            srcList : []
        })
        return;
    }

    const parsedMetadata = await parseMetadata(request.data)

    await Promise.all(
        parsedMetadata.image.map((data) => CopyImageToS3(arcaConId, data))
    )

    await Promise.all(
        parsedMetadata.video.map((data) => CopyImageToS3(arcaConId, data))
    )

    database.crawled.push({
        arcaConId: arcaConId,
        isDeleted : false,
        title : parsedMetadata.title,
        srcList : parsedMetadata.image.map(it => `${it.dataId}.${it.extension}`).concat(
            parsedMetadata.video.map(it => `${it.dataId}.${it.extension}`)
        )
    })
    return
}

async function parseMetadata(origHtmlString : string) {
    const $ = cheerio.load(origHtmlString)

    const title = $('meta[name=title]').attr('content')!

    const imageList = $('img.emoticon').map((i, item) => {

        const src = $(item).attr('src')
        const dataId = Number($(item).attr('data-id'))
        const extension = $(item).attr('src')?.split(".").at(-1)?.split("?").at(0)

        if(src === undefined || dataId === undefined || extension === undefined){
            return
        }

        return {
            src : "https:" + src,
            dataId : dataId,
            extension : extension
        }
    }).toArray()

    const videoList = $('video.emoticon').map((i, item) => {
        const src = $(item).attr('data-src')
        const dataId = Number($(item).attr('data-id'))
        const extension = $(item).attr('data-src')?.split(".").at(-1)?.split("?").at(0)

        if(src === undefined || dataId === undefined || extension === undefined){
            return
        }

        return {
            src : "https:" + src,
            dataId : dataId,
            extension : extension
        }
    }).toArray()

    console.log(`[parseMetadata] imageList`)
    console.log(imageList)
    console.log("--------------------------")
    console.log(`[parseMetadata] videoList`)
    console.log(videoList)
    console.log("--------------------------")


    return {
        title : title,
        image : imageList,
        video : videoList
    }
}

interface requestResponse{
    statusCode : number,
    data : string
}

async function requestArcaconPage(arcaConId : number) : Promise<requestResponse>{

    console.log(`[requestArcaconPage] download : https://arca.live/e/${arcaConId}`)
    
    return await axios.get<string>(`https://arca.live/e/${arcaConId}`)
        .then((response) => {
            return {statusCode : response.status, data : response.data}
        })
        .catch((error) => {
            if(error.response.status === 404){
                if(error.response.data.includes("삭제된 이모티콘입니다.")){
                    return {statusCode : 404, data : ""}
                }

                throw Error(`[requestArcaconPage] 아직 발매되지 않은 이모티콘 ID입니다.`)
            }

            if(error.response.status === 429){
                console.error(`[requestArcaconPage] Too Many Requests. 나중에 다시 시도해 보죠!`)
                process.exit(0)
            }

            throw Error(`[requestArcaconPage] 서버와의 통신에 실패했습니다. response code : ${error.response.status}`)
        })


}