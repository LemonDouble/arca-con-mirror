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

export interface StatusResult {
    numberOfDocuments: number
    isIndexing: boolean
    fieldDistribution: FieldDistribution
}

export interface FieldDistribution {
    con_number: number
    con_title: number
    confidence: number
    text: number
    uid: number
    url: number
}