import {crawledData, loadDatabase, saveDatabase} from "../database/database";
import {crwalAcacon} from "./lib/crawl";
import axios from "axios";

async function main(){
    const db = await loadDatabase()
    const crawledArcaconIdSet = new Set(db.crawled.map(it => it.arcaConId))

    let crawlCount = 0;

    const newArcaconList : crawledData[] = []

    for(let arcaConId = 1; arcaConId < 100000; arcaConId++){
        if(!crawledArcaconIdSet.has(arcaConId)){
            console.log(`arcacon ID : ${arcaConId}`);
            const newArcacon = await crwalAcacon(arcaConId);
            if(newArcacon){
                newArcaconList.push(newArcacon)
            }
            crawlCount++;

            if(crawlCount >= 5){
                break;
            }
        }
    }

    await axios.post(process.env.REGISTER_URL!, {
        api_key : process.env.REGISTER_API_KEY,
        data : newArcaconList.map(it => {
            return {
                arca_con_id : it.arcaConId,
                is_deleted : it.isDeleted,
                title : it.title,
                src_list: it.srcList
            }
        })
    })

    db.crawled.push(...newArcaconList)
    await saveDatabase(db)
}

main()
