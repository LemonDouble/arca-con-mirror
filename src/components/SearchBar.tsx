import {SearchIcon} from "@/components/icons/SearchIcon";
import {ChangeEvent} from "react";

interface Props {
    value? : string
    onChange? : (e : ChangeEvent<HTMLInputElement>) => void
}
export function SearchBar({value, onChange}: Props){
    return (
        <div className="mx-80 h-full">
            <div className="w-[790px] h-[80px] bg-white-3 rounded-2xl flex flex-row space-x-4 items-center p-4">
                <SearchIcon width={35} height={35}/>
                <input type="text"
                       value={value}
                       onChange={onChange}
                       className="grow h-full text-2xl focus:outline-none bg-transparent"/>
            </div>
        </div>
    )
}