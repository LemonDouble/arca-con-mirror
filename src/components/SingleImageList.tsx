import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from "next/image";
import {Stack, Typography} from "@mui/material";

type Props ={
    title : string,
    imageList : {
        img : string,
        title : string
    }[]
}


export default function SingleImageList(props : Props) {
    return (
        <Stack spacing={1} direction="column">
            <Typography variant="h6">{props.title}</Typography>

            <ImageList sx={{
                width: 1800,
                height: 100,
                gridAutoFlow: "column",
                gridTemplateColumns: "repeat(auto-fit, 100px) !important",
                gridAutoColumns: "minmax(100px, 1fr)"
            }} cols={1} rowHeight={100}>
                {props.imageList.map((item) => (
                    <ImageListItem key={item.img}>
                        <Image
                            style={{position: 'absolute'}}
                            src={`${item.img}`}
                            alt={item.title}
                            loading="lazy"
                            fill
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Stack>

    );
}