import {injectTransaction} from '../../../common/helpers/inject-transaction';
import getConfigsOfProjectsToRun from "@jest/core/build/getConfigsOfProjectsToRun";
import {KeywordProduct} from "../models/keyword_product.model";
import {Transaction} from 'sequelize';
import Logger from '../../../common/helpers/logger';

const logger = Logger.get('UPDATE-KEYWORD-PRODUCT');

const updateKeywordProduct = async (input: {
    readonly id: number,
    product_name: string,
    price: number,
    product_desc: string,
    brand: string,
    quantity: number,
    availability: string,
    position: number,
    image: string,
    tx: Transaction,
}): Promise<KeywordProduct> => {
    try {
        const keywordProduct = await KeywordProduct.findOne({where: {id: input.id}});
        if (!keywordProduct) {
            logger.error(`The keyword product with id ${input.id} was not found`);
            throw new Error('update keyword product error');
        }
        console.log(keywordProduct);

        keywordProduct.product_name = input.product_name;
        keywordProduct.price = input.price;
        keywordProduct.product_desc = input.product_desc;
        keywordProduct.brand = input.brand;
        keywordProduct.quantity = input.quantity;
        keywordProduct.availability = input.availability;
        keywordProduct.position = input.position;
        keywordProduct.image = input.image;
        console.log(keywordProduct);
        await keywordProduct.save({transaction: input.tx});
        return await KeywordProduct.scope('public').findByPk(keywordProduct.id, {transaction: input.tx});
    } catch (e) {
        console.log(e);
        logger.error('Update of keyword product failed ', e);
        throw e;
    }
};


export {updateKeywordProduct};