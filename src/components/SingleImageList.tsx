import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from "next/image";
import {Alert, Backdrop, Button, CircularProgress, Snackbar, Stack, Typography} from "@mui/material";
import JSZip from "jszip";
import axios from "axios";
import { saveAs } from 'file-saver';
import {useState} from "react";

type Props ={
    title : string,
    imageList : {
        src : string,
        alt : string
    }[]
}


export default function SingleImageList(props : Props) {

    const [isDownload, setIsDownload] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false);

    async function handleZipDownload(){
        setIsDownload(true)
        try{
            const zip = new JSZip()

            const downloadPromise = props.imageList.map(
                (image) => image.src
            ).map(
                async (src) => {
                    const data = (await axios.get(src, {responseType: "arraybuffer"})).data
                    zip.file(src.split("/").at(-1)!, data)
                }
            )

            await Promise.all(downloadPromise)

            const result = await zip.generateAsync({type: "blob"})
            await saveAs(result, `${props.title}.zip`)
        }catch (e) {
            setIsError(true)
        }
        setIsDownload(false)
    }
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsError(false);
    };

    return (
        <>
            <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: "top", horizontal: "center"}}>
                <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    다운로드 중 에러가 발생했습니다. 잠시 후 다시 해 주세요.
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isDownload}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        <Stack spacing={1} direction="column">
            <Stack spacing={1} direction="row">
                <Typography variant="h6">{props.title}</Typography>
                <Button variant="contained" color="success" onClick={handleZipDownload}>ZIP 다운받기</Button>
            </Stack>

            <ImageList sx={{
                width: "80vw",
                height: 120,
                gridAutoFlow: "column",
                gridTemplateColumns: "repeat(auto-fit, 100px) !important",
                gridAutoColumns: "minmax(100px, 1fr)",
            }} cols={1} rowHeight={100}>
                {props.imageList.map((item) => (
                    <ImageListItem key={item.src}>
                        {item.src.split(".").at(-1) !== "mp4" &&
                            <Image
                            style={{position: 'absolute'}}
                            src={`${item.src}`}
                            alt={item.alt}
                            loading="lazy"
                            fill
                        />}
                        {item.src.split(".").at(-1) === "mp4" &&
                            <video autoPlay loop muted playsInline style={{position: 'absolute', width:"100px"}}>
                                <source src={item.src} />
                            </video>
                        }
                    </ImageListItem>
                ))}
            </ImageList>
        </Stack>
        </>
    );
}