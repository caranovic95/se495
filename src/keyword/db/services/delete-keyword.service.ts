import {Keyword} from "../models/keyword.model";

const deleteKeyword = async (input: {
    id: number
}): Promise<Keyword | any> => {
    try {
        return await Keyword.destroy(
            {
                where: { id: input.id }
            });
    } catch (e) {
        console.log(e);
        throw new Error(e.message);

    }
};

export default deleteKeyword;