import { Keyword } from '../models/keyword.model'


const getKeywordById = async (input: {
    id: number
}): Promise<Keyword | any> => {
    try {
        const keyword = await Keyword.findOne({
            where:{
                id: input.id,
            }
        });
        return keyword;
    } catch (e) {
        throw new Error(e.message);
    }
};

export default getKeywordById;