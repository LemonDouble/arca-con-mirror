import {useEffect, useState} from "react";
import axios from "axios";
import {Stack, Typography} from '@mui/material';
import SingleImageList from "@/components/SingleImageList";

export interface database {
    crawled : crawledData[]
}

export interface crawledData {
    arcaConId : number,

    isDeleted : boolean,
    title : string,
    srcList : string[]
}
export default function Home() {

  const [dbData, setDbData] = useState<database>()
  useEffect(() => {
        async function fetchDB() {
          const data = (await axios.get("https://raw.githubusercontent.com/LemonDouble/arca-con-mirror/main/src/database/db.json")).data

            data.crawled = data.crawled.sort(
                (a : crawledData , b : crawledData) => b.arcaConId - a.arcaConId
            )

            setDbData(data)
        }

        fetchDB()
      })

  return <>
      <Stack spacing={2}>
          <Typography variant="h1"> 아카콘 미러입니다. 순서대로 긁어오는거라 필터링이 안 됨을 밝힙니다!! </Typography>
          {
              dbData?.crawled.filter((item) => !item.isDeleted).map((item) => {
                  return <SingleImageList key={item.arcaConId} title={item.title} imageList={
                      item.srcList.map((src) => {
                          return {
                              img : `https://dqbobx5h4f3nm.cloudfront.net/${item.arcaConId}/${src}`,
                              title : item.title
                          }
                      })}/>
              })
          }
      </Stack>
    </>
}
