import Logger from '../../../common/helpers/logger';
import {Category} from "../models/category.model";

const logger = Logger.get('GET-ALL-CATEGORIES');

const getCategories = async ()=> {
    try {
        const categories = await Category.findAll({raw : true ,
            nest: true , // <--- The issue of raw true, will be solved by this
            include: [{
                all: true
            }],
            attributes: ['sub_category']
        })
        return categories;
    } catch (e) {
        throw new Error(e.message);
    }
};

export default getCategories;