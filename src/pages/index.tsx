import React, {startTransition, useEffect, useState} from "react";
import {Backdrop, CircularProgress, Pagination, Stack, TextField, Typography} from '@mui/material';
import SingleImageList from "@/components/SingleImageList";
import {Box} from "@mui/system";
import {ArcaConData, getImageDataFromDB} from "@/common/api";
import Head from 'next/head';

export default function Home() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [fetchedImageData, setFetchedImageData] = useState<ArcaConData[]>([])
    const [displayImageData, setDisplayImageData] = useState<ArcaConData[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [maxPage, setMaxPage] = useState<number>(10)
    const pageSize = 10

    const [searchKeyword, setSearchKeyword] = useState<string>("")

  useEffect(() => {

      async function init(){
          if(fetchedImageData.length == 0){
              setIsLoading(true)
              const fetchData = await getImageDataFromDB()
              setFetchedImageData(fetchData)
              const allPage = fetchedImageData
              setDisplayImageData(allPage.slice((currentPage - 1) * pageSize, currentPage * pageSize))
              setMaxPage(Math.ceil(allPage.length / pageSize))
              setTimeout(() => setIsLoading(false), 1000)
          }
      }

        async function handlePageUpdate() {
            // Image Render는 오래 걸리므로, 지연 처리
            startTransition(() => {
                if (searchKeyword == "") {
                    const allPage = fetchedImageData
                    setDisplayImageData(allPage.slice((currentPage - 1) * pageSize, currentPage * pageSize))
                    setMaxPage(Math.ceil(allPage.length / pageSize))
                } else {
                    const withKeywordPage = fetchedImageData.filter((arcaConData) => arcaConData.title.includes(searchKeyword))
                    setDisplayImageData(withKeywordPage.slice((currentPage - 1) * pageSize, currentPage * pageSize) )
                    setMaxPage(Math.ceil(withKeywordPage.length / pageSize))
                }
            });
        }
        init()

        const timer = setTimeout(() => {
            handlePageUpdate()
        }, 500)

      return () => clearTimeout(timer)

      }, [currentPage, fetchedImageData, searchKeyword])

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
    };

    const handlePageTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(Number(event.target.value))
    };


  return <>
      <Head>
          <title>아카콘 미러</title>
      </Head>
      <Stack spacing={2} alignItems="center" my={6}>
          <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}
              onClick={() => setIsLoading(false)}
          >
              <CircularProgress color="inherit" />
          </Backdrop>
          <Box >
              <Stack alignItems="center" mx={2}>
                  <Typography variant="h2">아카콘 미러</Typography>
                  <Typography variant="subtitle1">순서대로 긁어오는 방식이라, 별도 필터링은 안 됩니다!</Typography>
                  <Typography variant="subtitle1">그리고 혹시 ZIP 다운로드가 안 되면, 새로고침 한번만 해 주세요.</Typography>
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
                              src : `https://cdn.lemondouble.com/arca-con-mirror/${item.arcaConId}/${src}`,
                              alt : item.title
                          }
                      })}/>
              })
          }

          <Pagination count={maxPage} page={currentPage} onChange={handlePageChange} color="primary" />

          <Stack direction="row" alignItems="center" spacing={1}>
              <Typography> 페이지로 바로 이동 (숫자 입력): </Typography>
              <TextField size="small" color="primary" type="number" value={currentPage} onChange={handlePageTextChange}/>
          </Stack>
      </Stack>
    </>
}
