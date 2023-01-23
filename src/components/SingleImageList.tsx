import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from "next/image";
import {Backdrop, Button, CircularProgress, Stack, Typography} from "@mui/material";
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

    async function handleZipDownload(){
        setIsDownload(true)
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
        setIsDownload(false)
        await saveAs(result, `${props.title}.zip`)
    }

    return (
        <>
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
                        <Image
                            style={{position: 'absolute'}}
                            src={`${item.src}`}
                            alt={item.alt}
                            loading="lazy"
                            fill
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Stack>
        </>
    );
}