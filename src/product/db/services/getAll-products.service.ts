import Logger from '../../../common/helpers/logger';
import { Product } from '../models/product.model';
import {Category} from "../../../category/db/models/category.model";
import {parseProductData} from "../../crawlers/product.crawler";

const logger = Logger.get('GET-PRODUCT');

const getAllProducts = async (page)=> {
    try {
        // let offset = page.page;
        const offset = parseInt(page.page as string || '1');

        let limit=10;
        let products = await Product.findAndCountAll({
            where:{active:1},
            limit,
            offset:(offset-1)*limit,
        })

        let lastPage= Math.round(products.count / limit);
        let meta = {
            "total": products.count,
            "page": offset,
            "last_page": lastPage
        };
        let data = products.rows;

        return {
            data,
            meta
        };
    } catch (e) {
        console.log(e)
        throw new Error(e.message);
    }
};

export default getAllProducts;