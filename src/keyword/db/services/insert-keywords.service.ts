import Logger from '../../../common/helpers/logger';
import {Keyword} from "../models/keyword.model";

const logger = Logger.get('CREATE-KEYWORD');

const createKeyword = async (input: {
    keyword: string,
}): Promise<Keyword | any> => {
    try {
        const dateTime = new Date();

        const keyword = await Keyword.create({
            keyword: input.keyword,
            created_at: dateTime
        });
        return keyword;
    } catch (e) {
        console.log(e);
        logger.error(`Creation of keyword ${input.keyword} failed`);
    }
};

export default createKeyword;