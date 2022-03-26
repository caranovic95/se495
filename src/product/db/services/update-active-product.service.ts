import {Product} from "../models/product.model";
import Logger from '../../../common/helpers/logger';

const logger = Logger.get('UPDATE-PRODUCT');

const updateProduct = async ()=> {
    try {
        const products_date = await Product.findAll({
            limit: 1,
            where: {
                //your where conditions, or without them if you need ANY entry
            },
            order: [ [ 'crawled_at', 'DESC' ]]
        })
        if(products_date.length && products_date.length>0){
            let nowDate = new Date();
            if(products_date[0].crawled_at<nowDate){
                await Product.update({ active : 0 },{ where : {  }});
            }
            return products_date;
        }
        else return [];

    } catch (e) {
        console.log(e)
        throw new Error(e.message);
    }
};




export { updateProduct };