export interface SearchResult {
    total_page: number
    total_elements: number
    data : ArcaCon[]
}

export interface ArcaCon{
    con_number : number
    con_title: string
    text : string
    url : string
}