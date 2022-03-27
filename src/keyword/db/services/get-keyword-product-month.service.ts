import Logger from '../../../common/helpers/logger';
import {KeywordProduct} from '../models/keyword_product.model';
import sequelize from "sequelize";

const logger = Logger.get('GET-CATEGORY');

const getKeywordProductByMonths = async (input: {
    product_id: number
}): Promise<KeywordProduct | any> => {
    try {
        const productByMonth = await KeywordProduct.findAll({
            where: {
                product_id: input.product_id
            },
            attributes: [
                'id',
                'product_name',
                'price',
                'quantity',
                'position',
                [sequelize.fn('date_format', sequelize.col('crawled_at'), '%Y-%m-%d'), 'date_col_formed']
            ],
            group: [sequelize.fn('date_format', sequelize.col('crawled_at'), '%Y-%m-%d'), 'date_col_formed']
        });
        console.log(productByMonth)
        return productByMonth;
    } catch (e) {

        console.log(e)
        throw new Error(e.message);
    }
};

export default getKeywordProductByMonths;