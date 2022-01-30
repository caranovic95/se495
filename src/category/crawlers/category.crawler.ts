import { Page } from 'puppeteer';
import {
    mapHrefs,
    getElementsLength,
    formatUrl
} from '../../utilities/crawler.formating';
import puppeteer from 'puppeteer'
import config from "../../common/helpers/config";
import {CategoryMapData, CategoryReturnData} from "./interface/category.crawler.interface";

const productSubCategory = '.category-menu-wrap .submenu-category-item ul li a';
const category_url=config.get('LINK');
const screenshotPath='screens/category.png';


export const parseCategoryData = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
        });
        const page = await browser.newPage();
        await page.goto(category_url, { waitUntil: 'networkidle0' });
        await page.screenshot({path: screenshotPath,fullPage: true});
        const category: CategoryReturnData[] = await parseCategories(page);
       // await createCategory(category);
        console.log(category)
        return category;

    } catch (e) {
        console.log(e);
        throw e;
    }
};



async function getSubCategories(page: Page) {
    try {
        let urlCategoryLinks:string[] = await page.$$eval(productSubCategory, mapHrefs);
        if (urlCategoryLinks && urlCategoryLinks.length) {
           urlCategoryLinks.map((item)=> formatUrl(item)).filter((item)=> item.includes(''||'/pages/celebrity-store-andjelka-prpic'));

        }
        const uniqLinks = [...new Set(urlCategoryLinks)];
        return uniqLinks;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function parseCategories(page: Page) {
    try {
        const elementsLength = await page.$$eval(productSubCategory, getElementsLength);
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
        const categories: CategoryReturnData[] = await mapCategory(mappingObj,elementsLength);
        return categories;
    } catch (e) {
       return [];
    }
}

async function mapCategory(mappingObj,elementsLength): Promise<CategoryReturnData[]> {
    try {
        let categoryArr: CategoryReturnData[] = [];

        for (let i = 0; i < elementsLength; i++) {
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