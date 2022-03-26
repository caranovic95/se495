
export interface KeywordDBInterface {
    readonly id: number,
    keyword: string,
    created_at: Date,
}

export interface KeywordProductDBInterface {
    readonly id: number,
    keyword_id: number,
    product_name: string,
    price: number,
    product_desc: string,
    brand: string,
    quantity: number,
    availability: string,
    position: number,
    image: string,
    crawled_at: Date,
    active: number,

}