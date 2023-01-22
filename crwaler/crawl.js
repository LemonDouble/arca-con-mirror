import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";


const __dirname = path.resolve();
async function copyImageToS3 (arcaConId,imageData) {
    const url = imageData.src
    const format = imageData.src.split(".").at(-1)
    const downloadPath = path.resolve(__dirname, `${imageData.dataId}.${format}`)
    const writer = fs.createWriteStream(downloadPath)

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}
async function crawl(arcaConId) {
    const htmlString = (await axios.get(`https://arca.live/e/${arcaConId}`)).data

    if(htmlString === "Too Many Requests"){
        throw Error("Too Many Requests")
    }

    const $ = cheerio.load(htmlString)

    const imageList = $('img.emoticon').map((i, item) => {
        return {
            src : "https:" + $(item).attr('src'),
            dataId : $(item).attr('data-id')
        }
    }).toArray()

    const videoList = $('video.emoticon').map((i, item) => {
        return {
            src : "https:" + $(item).attr('data-src'),
            dataId : $(item).attr('data-id')
        }
    }).toArray()

    await Promise.all(
        videoList.map((data) => copyImageToS3(arcaConId, data))
    )
}

crawl(29133)