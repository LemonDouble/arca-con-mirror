import React, {useEffect, useState} from "react";
import {Pagination, Stack, TextField, Typography} from '@mui/material';
import SingleImageList from "@/components/SingleImageList";
import {Box} from "@mui/system";
import {ArcaConData, getImageDataFromDB} from "@/common/api";
import Head from 'next/head';

export default function Home() {
    const [fetchedImageData, setFetchedImageData] = useState<ArcaConData[]>([])
    const [displayImageData, setDisplayImageData] = useState<ArcaConData[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [maxPage, setMaxPage] = useState<number>(10)
    const pageSize = 10

    const [searchKeyword, setSearchKeyword] = useState<string>("")

  useEffect(() => {
        async function init() {
            if(fetchedImageData.length == 0){
                const fetchData = await getImageDataFromDB()
                setFetchedImageData(fetchData)
            }

            if(searchKeyword == ""){
                setDisplayImageData(fetchedImageData.slice((currentPage-1) * pageSize,currentPage * pageSize))
            }else{
                setDisplayImageData(fetchedImageData.filter((arcaConData) => arcaConData.title.includes(searchKeyword)))
            }
            setMaxPage(Math.ceil(fetchedImageData.length / pageSize))
        }

        init()

      }, [currentPage, fetchedImageData, searchKeyword])

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setSearchKeyword("");
        setCurrentPage(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
    };


  return <>
      <Head>
          <title>아카콘 미러</title>
      </Head>
      <Stack spacing={2} alignItems="center" my={6}>
          <Box >
              <Stack alignItems="center">
                  <Typography variant="h1">아카콘 미러</Typography>
                  <Typography variant="subtitle1">순서대로 긁어오는 방식이라, 별도 필터링은 안 됩니다!</Typography>
              </Stack>
          </Box>
          <Box>
              <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography> 이름으로 찾기 : </Typography>
                  <TextField size="small" color="primary" value={searchKeyword} onChange={handleSearchChange}/>
              </Stack>
          </Box>
          <Pagination count={maxPage} page={currentPage} onChange={handlePageChange} color="primary" />

          {
              displayImageData.map((item) => {
                  return <SingleImageList key={item.arcaConId} title={item.title} imageList={
                      item.srcList.map((src) => {
                          return {
                              src : `https://dqbobx5h4f3nm.cloudfront.net/${item.arcaConId}/${src}`,
                              alt : item.title
                          }
                      })}/>
              })
          }

          <Pagination count={maxPage} page={currentPage} onChange={handlePageChange} color="primary" />
      </Stack>
    </>
}
