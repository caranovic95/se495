import Logger from '../../../common/helpers/logger';
import {Product} from '../models/product.model';
import {Category} from "../../../category/db/models/category.model";
import {parseProductData} from "../../crawlers/product.crawler";
import {Sequelize} from "sequelize-typescript";

const logger = Logger.get('GET-PRODUCT');

const getAllProducts = async (page) => {
        try {
            const offset = parseInt(page.page as string || '1');

            let limit = 10;
            let products = await Product.findAndCountAll({
                where: {active: 1},
                include: [{
                    model: Category,
                    attributes: ['sub_category'],
                }],
                raw: true,
                limit,
                offset: (offset - 1) * limit,
                group: ['product_id']
            });
            let lastPage = Math.ceil(products.count.length / limit);
            let meta = {
                "total": products.count.length,
                "page": offset,
                "last_page": lastPage
            };

            let data = products.rows;
            data.map((item) => item['category_url'] = item['category.sub_category'])
            data.map((item) => delete item['category.sub_category']);


            return {
                data,
                meta
            };
        } catch
            (e) {
            console.log(e)
            throw new Error(e.message);
        }
    }
;

export default getAllProducts;