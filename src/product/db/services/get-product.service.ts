//ovde napravi get product
import { Product } from '../models/product.model'


const getProductById = async (input: {
    id: number
}): Promise<Product | any> => {
    try {
        const product = await Product.findOne({
            where:{
                id: input.id,
            }
        });
        return product;
    } catch (e) {
        throw new Error(e.message);
    }
};

export default getProductById;