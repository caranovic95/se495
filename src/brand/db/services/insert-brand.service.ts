import Logger from '../../../common/helpers/logger';
import {injectTransaction} from '../../../common/helpers/inject-transaction';
import getConfigsOfProjectsToRun from "@jest/core/build/getConfigsOfProjectsToRun";
import {Brand} from "../models/brand.model";

const logger = Logger.get('CREATE-CURRENCY');

const createBrand = async (parseBrandData): Promise<any> => {
    try {
        const resultProduct: any = Object.values(parseBrandData);
        await Brand.bulkCreate(resultProduct);

    } catch (e) {
        console.log(e);
        logger.error('Creation of product failed ', e);
        throw e;
    }
};


export {createBrand};