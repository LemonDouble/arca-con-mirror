import {loadDatabase, saveDatabase} from "../database/database";
import {crwalAcacon} from "./lib/crawl";

async function main(){
    const db = await loadDatabase()
    const crawledArcaconIdSet = new Set(db.crawled.map(it => it.arcaConId))

    let crawlCount = 0;

    for(let arcaConId = 1; arcaConId < 100000; arcaConId++){
        if(!crawledArcaconIdSet.has(arcaConId)){
            console.log(`arcacon ID : ${arcaConId}`);
            await crwalAcacon(arcaConId, db);
            crawlCount++;

            if(crawlCount > 3){
                break;
            }
        }
    }

    await saveDatabase(db)
}

main()
