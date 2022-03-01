import Logger from '../../../common/helpers/logger';
import {Category} from '../models/category.model';
//import * as errors from '@common/helpers/errors';
import {Transaction} from 'sequelize';
import {injectTransaction} from '../../../common/helpers/inject-transaction';
import {parseCategoryData} from "../../crawlers/category.crawler";
import getConfigsOfProjectsToRun from "@jest/core/build/getConfigsOfProjectsToRun";
import {Product} from "../../../product/db/models/product.model";

const logger = Logger.get('CREATE-CURRENCY');

const createCategory = async (parseCategoryData): Promise<Category | any> => {
    try {
        let resultCategory: any = Object.values(parseCategoryData);
        await Category.bulkCreate(resultCategory)
    } catch (e) {
        console.log(e);
        logger.error('Creation of category failed ', e);
        throw e;
    }
};


export {createCategory};