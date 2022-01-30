import Logger from '../../../common/helpers/logger';
import { Category } from '../models/category.model';
//import * as errors from '@common/helpers/errors';
import { Transaction } from 'sequelize';
import { injectTransaction } from '../../../common/helpers/inject-transaction';
import {parseCategoryData} from "../../crawlers/category.crawler";
import getConfigsOfProjectsToRun from "@jest/core/build/getConfigsOfProjectsToRun";

const logger = Logger.get('CREATE-CURRENCY');

const createCategory = async (parseCategoryData): Promise<Category | any> => {
    try {
        const resultCategory: any = Object.values(parseCategoryData);
        for(let item of resultCategory){
            await Category.create(item);
        }
    } catch (e) {
        console.log(e);
        logger.error('Creation of category failed ', e);
        throw e;
    }
};
const injected = injectTransaction(createCategory);

export { injected as createCategory };