import { KeywordProduct } from '../models/keyword_product.model'


const getKeywordProductById = async (input: {
    id: number
}): Promise<KeywordProduct | any> => {
    try {
        const keyword = await KeywordProduct.findOne({
            where:{
                id: input.id,
            }
        });
        return keyword;
    } catch (e) {
        throw new Error(e.message);
    }
};

export default getKeywordProductById;