import {Page} from 'puppeteer';
import {allProductsNull} from '../../utilities/crawler.validations';
import {
    mapDataProductId,
    mapDataName,
    mapDataPrice,
    mapDataBrand,
    mapDataQuantity,
    mapDataPosition,
    mapImgSrc, formatPrice
} from '../../utilities/crawler.formating';
import puppeteer from 'puppeteer'
import getCategories from "../../category/db/services/get-categories.service";
import {createProduct} from "../db/services/insert-product.service";
import {ProductInterface} from "./interface/product.crawler.interface";
import {updateProduct} from "../db/services/update-active-product.service";

const productListPageSelector = '.product-wrap-grid .js-ga-product-data';
const screenshotPath = 'screens/category.png';


export const parseProductData = async () => {
    try {
        const browser = await puppeteer.launch({
            devtools:false,
            headless:false
        });
        let categories = await getCategories();
        let product: ProductInterface[];
        let prodArr = [];
        for (let item of categories) {
            console.log(item);
            const page = await browser.newPage();
            await page.setDefaultNavigationTimeout(0);

            await page.goto(item.sub_category, {waitUntil: ["domcontentloaded","networkidle2"]});
            await page.waitForTimeout(3000);
            await page.screenshot({path: screenshotPath, fullPage: true});
            product = await parseProducts(page, item.id);
            console.log(product)
            prodArr.push(product);
            await page.close();
        }
        //let getAllProducts=
        await updateProduct();
        await createProduct(prodArr);
        process.exit();

    } catch (e) {
        console.log(e);
        throw e;
    }
};

async function parseProducts(page: Page, category_id) {
    try {
        let id = await getId(page);
        let title = await getTitle(page);
        let price = await getPrice(page);
        let brand = await getBrand(page);
        let quantity = await getQuantity(page);
        let position = await getPosition(page);
        let image = await getProductImage(page);
        const crawled_at = new Date();

        const mappingObj: any = {
            category_id,
            id,
            title,
            price,
            brand,
            quantity,
            position,
            image,
            crawled_at
        };
        const products: ProductInterface[] = await mapProducts(mappingObj);
        return products;

    } catch (e) {
        return [];
    }
}





async function mapProducts(mappingObj): Promise<any[]> {
    try {
        let productArr: any[] = [];
        let elementsLength = mappingObj.id.length;
        for (let i = 0; i < elementsLength; i++) {

            productArr.push({
                category_id: mappingObj.category_id,
                product_id: mappingObj.id[i],
                title: mappingObj.title[i],
                price: mappingObj.price[i],
                brand: mappingObj.brand[i],
                quantity: mappingObj.quantity[i],
                position: mappingObj.position[i],
                image: mappingObj.image[i],
                crawled_at: mappingObj.crawled_at,
                active: 1
            });
        }
        return productArr;
    } catch (e) {
        throw e;
    }
}


async function getId(page: Page) {
    try {
        const ids = await page.$$eval(productListPageSelector, mapDataProductId);
        return ids;
    } catch (e) {
        return [];
    }
}

async function getTitle(page: Page) {
    try {
        const title = await page.$$eval(productListPageSelector, mapDataName);
        return title;
    } catch (e) {
        return [];
    }
}

async function getPrice(page: Page) {
    try {
        let price = await page.$$eval(productListPageSelector, mapDataPrice);
        price = price.map(Number);
        return price;
    } catch (e) {
        return [];
    }
}

async function getBrand(page: Page) {
    try {
        const brand = await page.$$eval(productListPageSelector, mapDataBrand);

        return brand;
    } catch (e) {
        return [];
    }
}

async function getQuantity(page: Page) {
    try {
        let quantity = await page.$$eval(productListPageSelector, mapDataQuantity);
        quantity = quantity.map(Number);
        return quantity;
    } catch (e) {
        return [];
    }
}

async function getPosition(page: Page) {
    try {
        let position = await page.$$eval(productListPageSelector, mapDataPosition);
        position = position.map(Number);
        return position;
    } catch (e) {
        return [];
    }
}

async function getProductImage(page: Page) {
    try {
        const image = await page.$$eval('.product-img-wrap-grid .images-wrapper img,.product-img-wrap-grid [data-image-info="main-image"]', mapImgSrc);
        return image;
    } catch (e) {
        return [];
    }
}


module.exports.getProductData = parseProductData;