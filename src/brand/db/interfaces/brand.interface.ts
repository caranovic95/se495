export interface BrandDBInterface {
    readonly id: number,
    category_id: number,
    brand_name: string
    created_at: Date,
}
export interface BrandProductDBInterface {
    product_id: number,
    title: string,
    availability: number,
    price: number,
    description: string,
    delivery: number,
    position: number,
    image: string,
    crawled_at: string,
}