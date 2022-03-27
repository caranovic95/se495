import {Page} from 'puppeteer';
import {allProductsNull} from '../../utilities/crawler.validations';
import {
    mapDataProductId,
    mapDataName,
    mapDataPrice,
    mapDataBrand,
    mapDataQuantity,
    mapDataPosition,
    mapImgSrc, formatPrice, mapTextContent, getElementsLength
} from '../../utilities/crawler.formating';
import puppeteer from 'puppeteer'
import getCategories from "../../category/db/services/get-categories.service";
import config from "../../common/helpers/config";
import getKeywords from "../db/services/get-keywords.service";
import {ProductInterface} from "../../product/crawlers/interface/product.crawler.interface";
import {createKeywordProduct} from "../db/services/insert-product_keywords.service";
import {updateKeywordProduct} from "../db/services/update-active-product_keyword.service";


const productListPageSelector = '.product-wrap-grid .js-ga-product-data';
const screenshotPath = 'screens/category.png';
const brandLinkSelectors = '.header-links a:nth-child(5), .header-links a:nth-child(6)';
const url = config.get('KEYWORDS_LINK');


export const parseProductKeywordData = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false
        });
        let keywords = await getKeywords();
        let keyword = [];
        let keywordArr = [];
        for (let item of keywords) {

            const page = await browser.newPage();
            await page.setDefaultNavigationTimeout(0);
            await page.goto(url + item.keyword, {waitUntil: ["domcontentloaded", "networkidle2"]});
            await page.waitForTimeout(3000);
            await page.screenshot({path: screenshotPath, fullPage: true});
            keyword = await parseKeywordsProduct(page, item.id);
            keywordArr.push(keyword);
            await page.close();

        }
        console.log(keywordArr);
        await updateKeywordProduct();
        await createKeywordProduct(keywordArr);
        process.exit();

    } catch (e) {
        console.log(e);
        throw e;
    }
};


async function parseKeywordsProduct(page: Page, keyword_id) {
    try {
        let product_id = await getProductId(page);
        let product_name = await getTitle(page);
        let price = await getPrice(page);
        let product_desc = await getDesc(page);
        let brand = await getBrand(page);
        let quantity = await getQuantity(page);
        let availability = await getAvailability(page);
        let position = await getPosition(page);
        let image = await getProductImage(page);
        const crawled_at = new Date();

        const mappingObj: any = {
            product_id,
            keyword_id,
            product_name,
            price,
            product_desc,
            brand,
            quantity,
            availability,
            position,
            image,
            crawled_at
        };
        const products: any[] = await mapKeywordsProduct(mappingObj);
        return products;

    } catch (e) {
        return [];
    }
}

async function mapKeywordsProduct(mappingObj): Promise<any[]> {
    try {

        let productArr: any[] = [];
        let elementsLength = mappingObj.product_id.length;
        for (let i = 0; i < elementsLength; i++) {

            productArr.push({
                product_id: mappingObj.product_id[i],
                keyword_id: mappingObj.keyword_id,
                product_name: mappingObj.product_name[i],
                price: mappingObj.price[i],
                product_desc: mappingObj.product_desc[i],
                brand: mappingObj.brand[i],
                quantity: mappingObj.quantity[i],
                availability: mappingObj.availability[i],
                position: mappingObj.position[i],
                image: mappingObj.image[i],
                crawled_at: mappingObj.crawled_at,
                active: 1
            });
        }
        console.log(productArr);
        return productArr;
    } catch (e) {
        throw e;
    }
}

async function getProductId(page: Page) {
    try {
        const ids = await page.$$eval(productListPageSelector, mapDataProductId);
        return ids;
    } catch (e) {
        return [];
    }
}

async function getDesc(page: Page) {
    try {
        const desc = await page.$$eval('.product-description-grid', mapTextContent);
        return desc;
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

async function getAvailability(page: Page): Promise<number> {
    try {
        return await page.$$eval('.product-on-stock', mapTextContent);
    } catch (e) {
        return null;
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


module.exports.getProductData = parseProductKeywordData;