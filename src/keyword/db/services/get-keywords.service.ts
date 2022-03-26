import Logger from '../../../common/helpers/logger';
import {Keyword} from "../models/keyword.model";

const logger = Logger.get('GET-ALL-KEYWORDS');

const getKeywords = async () => {
    try {
        const keywords = await Keyword.findAll({
            raw: true,
        })
        return keywords;
    } catch (e) {
        throw new Error(e.message);
    }
};

export default getKeywords;