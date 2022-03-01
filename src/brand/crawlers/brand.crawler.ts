// import {Page} from 'puppeteer';
// import {allProductsNull} from '../../utilities/crawler.validations';
// import {
//     mapDataProductId,
//     mapDataName,
//     mapDataPrice,
//     mapDataBrand,
//     mapDataQuantity,
//     mapDataPosition,
//     mapImgSrc, formatPrice
// } from '../../utilities/crawler.formating';
// import puppeteer from 'puppeteer'
// import getCategories from "../../category/db/services/get-categories.service";
//
// import {createBrand} from "../../brand/db/services/insert-brand.service";
// import getBrands from "../db/services/get-brands.service";
// import {BrandInterface} from "./interface/brand.crawler.interface";
//
// const productListPageSelector = '.product-wrap-grid .js-ga-product-data';
// const screenshotPath = 'screens/category.png';
//
// const brandLinkSelectors ='.header-links a:nth-child(5), .header-links a:nth-child(6)';
//
//
// export const parseProductData = async () => {
//     try {
//         const browser = await puppeteer.launch({
//             headless: true
//         });
//         let brands = await getBrands();
//         let product: BrandInterface[];
//         let brand = [];
//         let prodArr = [];
//         let brandArr= [];
//         for (let item of brands) {
//             console.log(item);
//             const page = await browser.newPage();
//             await page.goto('https://www.tehnomanija.rs/index.php?mod=catalog&op=thm_search&search_type=&submited=1&keywords='+item.brand_name, {waitUntil: 'networkidle0'});
//             await page.waitForTimeout(3000);
//             await page.screenshot({path: screenshotPath, fullPage: true});
//             product = await parseProducts(page, item.id);
//             brand = await parseBrand(page);
//             prodArr.push(product);
//             brandArr.push(brand);
//             await page.close();
//
//         }
//         await updateProduct();
//         await createProduct(prodArr);
//         await createBrand(brandArr);
//         process.exit();
//
//     } catch (e) {
//         console.log(e);
//         throw e;
//     }
// };
//
// async function parseProducts(page: Page, category_id) {
//     try {
//         let id = await getId(page);
//         let title = await getTitle(page);
//         let price = await getPrice(page);
//         let quantity = await getQuantity(page);
//         let position = await getPosition(page);
//         let image = await getProductImage(page);
//         const crawled_at = new Date();
//
//         const mappingObj: any = {
//             category_id,
//             id,
//             title,
//             price,
//             quantity,
//             position,
//             image,
//             crawled_at
//         };
//         const products: ProductInterface[] = await mapProducts(mappingObj);
//         return products;
//
//     } catch (e) {
//         return [];
//     }
// }
//
// async function parseBrand(page: Page) {
//     let brand = await getBrand(page);
//     brand = [...new Set(brand)];
//     const created_at = new Date();
//     const mappingObj: any = {
//         brand,
//         created_at
//     };
//     console.log(mappingObj);
//     const products: BrandInterface[] = await mapBrands(mappingObj);
//     return products;
//
// }
//
// async function mapBrands(mappingObj): Promise<any[]> {
//     let brandArr: any[] = [];
//     for (let i = 0;i<mappingObj.brand.length; i++) {
//
//         brandArr.push({
//             brand_name: mappingObj.brand[i],
//             created_at: mappingObj.created_at
//         });
//     }
//     return brandArr;
//
// }
//
// async function mapProducts(mappingObj): Promise<any[]> {
//     try {
//         let productArr: any[] = [];
//         let elementsLength = mappingObj.id.length;
//         for (let i = 0; i < elementsLength; i++) {
//
//             productArr.push({
//                 category_id: mappingObj.category_id,
//                 product_id: mappingObj.id[i],
//                 title: mappingObj.title[i],
//                 price: mappingObj.price[i],
//                 quantity: mappingObj.quantity[i],
//                 position: mappingObj.position[i],
//                 image: mappingObj.image[i],
//                 crawled_at: mappingObj.crawled_at,
//                 active: 1
//             });
//         }
//         return productArr;
//     } catch (e) {
//         throw e;
//     }
// }
//
//
// async function getId(page: Page) {
//     try {
//         const ids = await page.$$eval(productListPageSelector, mapDataProductId);
//         return ids;
//     } catch (e) {
//         return [];
//     }
// }
//
// async function getTitle(page: Page) {
//     try {
//         const title = await page.$$eval(productListPageSelector, mapDataName);
//         return title;
//     } catch (e) {
//         return [];
//     }
// }
//
// async function getPrice(page: Page) {
//     try {
//         let price = await page.$$eval(productListPageSelector, mapDataPrice);
//         price = price.map(Number);
//         return price;
//     } catch (e) {
//         return [];
//     }
// }
//
// async function getBrand(page: Page) {
//     try {
//         const brand = await page.$$eval(productListPageSelector, mapDataBrand);
//         let uniq = [...new Set(brand)];
//
//         return uniq;
//     } catch (e) {
//         return [];
//     }
// }
//
// async function getQuantity(page: Page) {
//     try {
//         let quantity = await page.$$eval(productListPageSelector, mapDataQuantity);
//         quantity = quantity.map(Number);
//         return quantity;
//     } catch (e) {
//         return [];
//     }
// }
//
// async function getPosition(page: Page) {
//     try {
//         let position = await page.$$eval(productListPageSelector, mapDataPosition);
//         position = position.map(Number);
//         return position;
//     } catch (e) {
//         return [];
//     }
// }
//
// async function getProductImage(page: Page) {
//     try {
//         const image = await page.$$eval('.product-img-wrap-grid .images-wrapper img,.product-img-wrap-grid [data-image-info="main-image"]', mapImgSrc);
//         return image;
//     } catch (e) {
//         return [];
//     }
// }
//
//
// module.exports.getProductData = parseProductData;