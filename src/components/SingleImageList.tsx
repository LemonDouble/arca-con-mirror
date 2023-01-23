import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from "next/image";
import {Stack, Typography} from "@mui/material";

type Props ={
    title : string,
    imageList : {
        src : string,
        alt : string
    }[]
}


export default function SingleImageList(props : Props) {
    return (
        <Stack spacing={1} direction="column">
            <Typography variant="h6">{props.title}</Typography>

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

    );
}