import {KeywordProduct} from "../models/keyword_product.model";

const deleteKeywordProduct = async (input: {
    id: number
}): Promise<KeywordProduct | any> => {
    try {
        return await KeywordProduct.destroy(
            {
                where: { id: input.id }
            });
    } catch (e) {
        console.log(e);
        throw new Error(e.message);

    }
};

export default deleteKeywordProduct;