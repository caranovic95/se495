import Logger from '../../../common/helpers/logger';
import {Product} from '../models/product.model';
import sequelize from "sequelize";

const logger = Logger.get('GET-PRODUCT-BY-MONTH');

const getProductByMonths = async (input: {
    product_id: number
}): Promise<Product | any> => {
    try {
        const productByMonth = await Product.findAll({
            where: {
                product_id: input.product_id
            },
            attributes: [
                'id',
                'title',
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

export default getProductByMonths;