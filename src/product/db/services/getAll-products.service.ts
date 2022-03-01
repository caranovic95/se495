import Logger from '../../../common/helpers/logger';
import { Product } from '../models/product.model';
import {Category} from "../../../category/db/models/category.model";

const logger = Logger.get('GET-PRODUCT');

const getAllProducts = async ()=> {
    try {
        const products = await Product.findAll({
            group: ['product_id']
        })
        return products;
    } catch (e) {
        console.log(e)
        throw new Error(e.message);
    }
};

export default getAllProducts;