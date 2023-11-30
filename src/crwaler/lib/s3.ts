import stream from 'stream'
import axios from "axios";
import { S3Client } from "@aws-sdk/client-s3";
import {Upload} from "@aws-sdk/lib-storage";

export interface ImageMetaData {
    src : string,
    dataId : number,

    extension : string,
}

export async function CopyImageToS3(arcaCondId: number, imageMetaData : ImageMetaData){
    let contentType = 'application/octet-stream'
    let promise = null

    const uploadStream = () => {
        const pass = new stream.PassThrough();
        promise = new Upload({
            client: new S3Client({region : process.env.AWS_REGION, endpoint : process.env.AWS_ENDPOINT_URL }),
            params :{
                Bucket : process.env.S3_BUCKET_NAME,
                Key: `arca-con-mirror/${arcaCondId}/${imageMetaData.dataId}.${imageMetaData.extension}`,
                Body: pass,
                ContentType: contentType,
            }
        })

        promise.done()

        return pass;
    }

    axios({
        method: 'get',
        url: imageMetaData.src,
        responseType: 'stream'
    }).then( (response) => {
        if(response.status===200){
            contentType = response.headers['content-type']!;
            response.data.pipe(uploadStream());
        }
    }).catch(() => {});

    return promise
}
