import {useEffect, useState} from "react";
import axios from "axios";
import { Stack } from '@mui/material';
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
            console.log(data)
            setDbData(data)
        }

        fetchDB()
      })

  return <>
      <Stack spacing={2}>
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
