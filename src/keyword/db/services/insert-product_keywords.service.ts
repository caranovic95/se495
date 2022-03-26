import Logger from '../../../common/helpers/logger';
import {injectTransaction} from '../../../common/helpers/inject-transaction';
import getConfigsOfProjectsToRun from "@jest/core/build/getConfigsOfProjectsToRun";
import {KeywordProduct} from "../models/keyword_product.model";

const logger = Logger.get('CREATE-CURRENCY');

const createKeywordProduct = async (parseKeywordsProductData): Promise<any> => {
    try {
        const resultKeywordProduct: any = Object.values(parseKeywordsProductData);
        console.log("product: ", resultKeywordProduct)
        for (let item of resultKeywordProduct) {
            await KeywordProduct.bulkCreate(item)
        }
        return {
            message: 'keyword products have been crawled and  inserted'
        }
    } catch (e) {
        console.log(e);
        logger.error('Creation of product failed ', e);
        throw e;
    }
};


export {createKeywordProduct};