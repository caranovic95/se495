import Logger from '../../../common/helpers/logger';
import {Category} from "../models/category.model";

const logger = Logger.get('GET-ALL-CATEGORIES');

const getCategoriesPage = async (page) => {
    try {
        const offset = parseInt(page.page as string || '1');

        let limit = 10;
        const categories = await Category.findAndCountAll({
            raw: true,
            limit,
            offset: (offset - 1) * limit,
            group: ['sub_category']
        })
        let lastPage = Math.ceil(categories.count.length / limit);
        let meta = {
            "total": categories.count.length,
            "page": offset,
            "last_page": lastPage
        };
        let data = categories.rows;

        return {
            data,
            meta
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

export default getCategoriesPage;