export interface ProductDBInterface {
    readonly id: number,
    product_id: number,
    title: string
    price: number,
    brand: string,
    quantity: number,
    position: number,
    image: string,
    crawled_at: string,
    active: number,
}