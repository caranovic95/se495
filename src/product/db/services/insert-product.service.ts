import Logger from '../../../common/helpers/logger';
import {injectTransaction} from '../../../common/helpers/inject-transaction';
import getConfigsOfProjectsToRun from "@jest/core/build/getConfigsOfProjectsToRun";
import {Product} from "../models/product.model";

const logger = Logger.get('CREATE-CURRENCY');

const createProduct = async (parseProductData): Promise<any> => {
    try {
        const resultProduct: any = Object.values(parseProductData);
        console.log("product: ",resultProduct)
        for (let item of resultProduct) {
            await Product.bulkCreate(item)
        }
    } catch (e) {
        console.log(e);
        logger.error('Creation of product failed ', e);
        throw e;
    }
};


export {createProduct};