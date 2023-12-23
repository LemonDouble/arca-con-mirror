export interface SearchResult {
    hits: Hit[]
    query: string
    processingTimeMs: number
    limit: number
    offset: number
    estimatedTotalHits: number
}

export interface Hit {
    uid: string
    con_number: number
    con_title: string
    url: string
    text: string
    confidence: number
    _formatted: Formatted
}

export interface Formatted {
    uid: string
    con_number: string
    con_title: string
    url: string
    text: string
    confidence: string
}
