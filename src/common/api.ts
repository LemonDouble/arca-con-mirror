import axios from "axios";
export interface RawData {
    crawled : ArcaConData[]
}

export interface ArcaConData {
    arcaConId : number,
    isDeleted : boolean,
    title : string,
    srcList : string[]
}

export async function getImageDataFromDB(){
    const rawData = (await axios.get<RawData>("https://raw.githubusercontent.com/LemonDouble/arca-con-mirror/main/src/database/db.json")).data

    return rawData.crawled.filter(
        (arcaConData) => !arcaConData.isDeleted // 크롤링 시 삭제되었떤 데이터는 Filter
    ).sort(
        (a, b) => b.arcaConId - a.arcaConId // 최신순 정렬
    )
}