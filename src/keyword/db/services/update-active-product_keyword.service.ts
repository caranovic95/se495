import {KeywordProduct} from "../models/keyword_product.model";
import Logger from '../../../common/helpers/logger';

const logger = Logger.get('UPDATE-KEYWORD-PRODUCT');

const updateKeywordProduct = async () => {
    try {
        const keywordProductsDate = await KeywordProduct.findAll({
            limit: 1,
            where: {
                //your where conditions, or without them if you need ANY entry
            },
            order: [['crawled_at', 'DESC']]
        })
        if (keywordProductsDate.length && keywordProductsDate.length > 0) {
            let nowDate = new Date();
            if (keywordProductsDate[0].crawled_at < nowDate) {
                await KeywordProduct.update({active: 0}, {where: {}});
            }
            return keywordProductsDate;
        } else return [];

    } catch (e) {
        console.log(e)
        throw new Error(e.message);
    }
};


export {updateKeywordProduct};