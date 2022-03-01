import {injectTransaction} from '../../../common/helpers/inject-transaction';
import getConfigsOfProjectsToRun from "@jest/core/build/getConfigsOfProjectsToRun";
import {Product} from "../models/product.model";
import { Transaction } from 'sequelize';
import Logger from '../../../common/helpers/logger';

const logger = Logger.get('UPDATE-PRODUCT');

const updateProduct = async (input: {
    id: number,
    title: string,
    price: number,
    brand: string,
    quantity: number,
    position: number,
    image: string,
    tx: Transaction,
}): Promise<Product> => {
    try {
        const product = await Product.findOne({ where: { id: input.id } });
        if (!product) {
            logger.error(`The Product with uuid ${input.id} was not found`);
            throw new Error('update product error');
        }

        product.title = input.title;
        product.price = input.price;
        product.brand = input.brand;
        product.quantity = input.quantity;
        product.position = input.position;
        product.image = input.image;

        await product.save({ transaction: input.tx });
        return await Product.scope('public').findByPk(product.id, { transaction: input.tx });
    } catch (e) {
        logger.error('Update of role failed ', e);
        throw e;
    }
};



export { updateProduct };