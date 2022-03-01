
export interface CategoryDBInterface {
    readonly id: number,
    shopname: string,
    category_url: string,
    screenshot?: any,
    crawled_at: string,
    sub_categories: any,
}
