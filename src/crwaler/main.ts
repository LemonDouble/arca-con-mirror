import {loadDatabase, saveDatabase} from "../database/database";
import {crwalAcacon} from "./lib/crawl";

async function main(){
    const db = await loadDatabase()
    const crawledArcaconIdSet = new Set(db.crawled.map(it => it.arcaConId))
    let crawlCount = 0;
    
    for(let arcaConId = 1; arcaConId < 100000; arcaConId++){
        if(!crawledArcaconIdSet.has(arcaConId)){
            conosle.log(`arcacon ID : ${arcaconId}`);
            await crwalAcacon(arcaConId, db);
            break;
        }
    }

    await saveDatabase(db)
}

main()
