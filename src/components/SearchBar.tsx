import {SearchIcon} from "@/components/icons/SearchIcon";
import {ChangeEvent} from "react";

interface Props {
    value? : string
    onChange? : (e : ChangeEvent<HTMLInputElement>) => void
}
export function SearchBar({value, onChange}: Props){
    return (
        <div className="xl:w-[790px] h-[80px] bg-white-3 rounded-2xl flex flex-row space-x-4 items-center mt-5 p-2 xl:p-4 mx-2">
            <div className="flex-none">
                <SearchIcon width={35} height={35}/>
            </div>
            <input type="text"
                   value={value}
                   onChange={onChange}
                   className="xl:grow h-full text-xl xl:text-2xl focus:outline-none bg-transparent"/>
        </div>
    )
}