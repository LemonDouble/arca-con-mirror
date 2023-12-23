"use client"
import {SearchBar} from "@/components/SearchBar";
import {LemonLogo} from "@/components/icons/LemonLogo";
import React, {useEffect, useState} from "react";
import {useThrottle} from "@/hooks/useThrottle";
import Image from "next/image";
import {SearchResult} from "@/types";
import Link from "next/link";

export default function Home() {
    const [searchText, setSearchText] = useState("")
    const throttledInputText = useThrottle(searchText, 1000)
    const [searchResult, setSearchResult] = useState<SearchResult>({
        hits : [], query : "", processingTimeMs : 0, limit : 0, offset : 0, estimatedTotalHits :0
    })

    useEffect(() => {
        async function handleSearchTextChange(){
            const response = await fetch("https://meili.rabbitprotocol.com/indexes/arca-con/search", {
                method : "POST",
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer dce2ea6d58c7364c4964c0911cdfb3f8bc966d218b500f98ff4e7cd45b3a6a87'
                },
                body : JSON.stringify({
                    "q": throttledInputText,
                    "attributesToSearchOn" : ["text"],
                    "attributesToHighlight" :["text"],
                    "highlightPreTag": "<search-highlight>",
                    "highlightPostTag": "</search-highlight>",
                    "limit": 21,
                    "offset": 0
                })
            })
            const result : SearchResult = await response.json()
            setSearchResult(result)
            console.log(result)
        }

        handleSearchTextChange()

    }, [throttledInputText]);

  return (
    <main className="w-screen h-auto min-h-screen">
        <header className="w-screen h-[80px] bg-lemon-yellow px-4 flex flex-row space-x-3 items-center">
            <LemonLogo width={32} height={32} />
            <span className="text-2xl font-extrabold">LemonDouble</span>
        </header>
        <div id="container" className="h-full mx-[360px] flex flex-col items-center">
            <span className="text-6xl font-extrabold text-black-1 mt-12 text-nowrap">아카콘 미러</span>
            <span className="text-3xl font-extrabold text-black-3 mt-3 text-nowrap">그런데 이제 대사로도 검색이 되는</span>
            <div className="mt-9">
                <SearchBar
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <div id="stack" className="mt-2 flex flex-col space-y-2">
                {searchResult.hits.map(item => (
                    <div className="w-[790px] p-8 flex flex-row space-x-5 bg-white-1 border-2 border-b-black-1 rounded-2xl" key={item.url}>
                        <Image src={item.url} alt={"아카콘 이미지"} width={100} height={100} />
                        <div className="flex flex-col grow">
                            <span className="text-2xl font-bold text-black-1">{item.con_title}</span>
                            <Link href={`https://arca.live/e/${item.con_number}`} target="_blank">
                                <span className="text-lg font-normal text-black-3">{`https://arca.live/e/${item.con_number}`}</span>
                            </Link>
                            <span className="mt-2 text-lg font-semibold text-black-1" dangerouslySetInnerHTML={{__html : item._formatted.text}}></span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </main>
  )
}
