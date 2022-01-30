import Logger from '../../../common/helpers/logger';
import {injectTransaction} from '../../../common/helpers/inject-transaction';
import getConfigsOfProjectsToRun from "@jest/core/build/getConfigsOfProjectsToRun";
import {Product} from "../models/product.model";
const logger = Logger.get('CREATE-CURRENCY');

const createProduct = async (parseProductData): Promise< any> => {
    try {
        const resultProduct: any = Object.values(parseProductData);
        for(let item of resultProduct){
            await Product.create(item);
        }
    } catch (e) {
        console.log(e);
        logger.error('Creation of product failed ', e);
        throw e;
    }
};
const injected = injectTransaction(createProduct);

export {injected as createProduct};