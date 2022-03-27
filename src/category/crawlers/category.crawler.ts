import { Page } from 'puppeteer';
import {
    mapHrefs,
    getElementsLength,
    formatUrl, mapDataBrand
} from '../../utilities/crawler.formating';
import puppeteer from 'puppeteer'
import config from "../../common/helpers/config";
import {BrandReturnData, CategoryMapData, CategoryReturnData} from "./interface/category.crawler.interface";
import {createCategory} from "../db/services/insert-category.service";

const productSubCategory = '.category-menu-wrap .submenu-category-item ul li a';
const category_url=config.get('LINK');
const screenshotPath='screens/category.png';

export const parseCategoryData = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
        });
        const page = await browser.newPage();
        await page.goto(category_url, { waitUntil: 'networkidle0' });
        await page.screenshot({path: screenshotPath,fullPage: true});
        const category: CategoryReturnData[] = await parseCategories(page);
        await page.waitForTimeout(5000)
        await page.close();
        await page.waitForTimeout(5000)
        await createCategory(category);
        await page.waitForTimeout(5000)
        return category;
 

    } catch (e) {
        console.log(e);
        throw e;
    }
};



async function getSubCategories(page: Page) {
    try {
        let urlCategoryLinks:string[] = await page.$$eval(productSubCategory, mapHrefs);
        urlCategoryLinks =  urlCategoryLinks.filter(e =>  e);
        console.log("MAP HREFOVI: ",urlCategoryLinks.length)
        return urlCategoryLinks
    } catch (error) {
        console.log(error);
        return [];
    }
}




async function parseCategories(page: Page) {
    try {
        const shop_name = extractShopName(category_url);
        let categoryLinks = await getSubCategories(page);
        const crawled_at = new Date().toJSON();


        const mappingObj: CategoryMapData = {
            shop_name,
            category_url,
            crawled_at,
            screenshot: screenshotPath,
            sub_category: categoryLinks
        };
        const categories: CategoryReturnData[] = await mapCategory(mappingObj);
        return categories;
    } catch (e) {
        return [];
    }
}

async function mapCategory(mappingObj): Promise<CategoryReturnData[]> {
    try {
        let categoryArr: CategoryReturnData[] = [];
        const elemLength =mappingObj.sub_category.length;
        for (let i = 0; i < elemLength; i++) {
            categoryArr.push({
                shop_name: mappingObj.shop_name,
                category_url: category_url,
                screenshot: mappingObj.screenshot,
                crawled_at: mappingObj.crawled_at,
                sub_category: mappingObj.sub_category[i]
            });
        }
        return categoryArr;
    } catch (e) {
        throw e;
    }
}

function extractShopName(category_url: string): string | null {
    return category_url ?
        category_url.split('.rs')[0].split('www.').pop() : null;
}


module.exports.getCategoryData = parseCategoryData;