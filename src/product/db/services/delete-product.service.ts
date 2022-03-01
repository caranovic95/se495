import {Product} from "../models/product.model";

const deleteProduct = async (input: {
    id: number
}): Promise<Product | any> => {
    try {
        return await Product.destroy(
            {
                where: { id: input.id }
            });
    } catch (e) {
        console.log(e);
        throw new Error(e.message);

    }
};

export default deleteProduct;