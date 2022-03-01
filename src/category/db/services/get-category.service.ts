import Logger from '../../../common/helpers/logger';
import { Category } from '../models/category.model';

const logger = Logger.get('GET-CATEGORY');

const getCategoryById = async (input: {
    id: number
}): Promise<Category | any> => {
    try {
        const category = await Category.findOne({
            where:{
               id : input.id
            }
        });
        return category;
    } catch (e) {
        throw new Error(e.message);
    }
};

export default getCategoryById;