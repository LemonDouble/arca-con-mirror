import path from 'path';
import fs from "fs";

export interface database {
    crawled : crawledData[]
}

export interface crawledData {
    arcaConId : number,

    isDeleted : boolean,
    title : string,
    srcList : string[]
}

/**
 * File을 DB처럼 사용한다.
 */

const databaseLocation = path.resolve(__dirname,"db.json")

export async function loadDatabase() : Promise<database>{
    const origData = fs.readFileSync(databaseLocation).toString()
    return JSON.parse(origData)
}

export async function saveDatabase(db : database){

    db.crawled = removeDuplicate(db.crawled)
    // 아카콘 ID 기준 오름차순 정렬
    db.crawled.sort((a,b) => a.arcaConId - b.arcaConId)

    fs.writeFileSync(databaseLocation, JSON.stringify(db))
}

function removeDuplicate(list : crawledData[]){
    const set = new Set(list)

    return [...set]
}