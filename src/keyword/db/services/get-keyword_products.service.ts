import Logger from '../../../common/helpers/logger';
import {KeywordProduct} from '../models/keyword_product.model';
import {Category} from "../../../category/db/models/category.model";
import {Keyword} from "../../../common/models";

const logger = Logger.get('GET-KEYWORD-PRODUCT');

const getAllKeywordProducts = async (page) => {
    try {
        const offset = parseInt(page.page as string || '1');

        let limit = 10;
        let products = await KeywordProduct.findAndCountAll({
            where: {active: 1},
            include: [{
                model: Keyword,
                attributes: ['keyword'],
            }],
            raw: true,
            limit,
            offset: (offset - 1) * limit,
            group: ['product_name']
        });
        let lastPage = Math.ceil(products.count.length / limit);
        let meta = {
            "total": products.count.length,
            "page": offset,
            "last_page": lastPage
        };
        let data = products.rows;
        data.map((item) => item['keyword'] = item['keyword.keyword'])
        data.map((item) => delete item['keyword.keyword']);
        return {
            data,
            meta
        };
    } catch (e) {
        console.log(e)
        throw new Error(e.message);
    }
};

export default getAllKeywordProducts;