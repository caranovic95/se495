import Logger from '../../../common/helpers/logger';
import {Keyword} from "../models/keyword.model";

const logger = Logger.get('GET-ALL-KEYWORDS');

const getShowKeywords = async (page) => {
    try {
        const offset = parseInt(page.page as string || '1');

        let limit = 10;
        const keywords = await Keyword.findAndCountAll({
            raw: true,
            limit,
            offset: (offset - 1) * limit,
            group: ['keyword']
        })
        let lastPage = Math.ceil(keywords.count.length / limit);
        let meta = {
            "total": keywords.count.length,
            "page": offset,
            "last_page": lastPage
        };
        let data = keywords.rows;

        return {
            data,
            meta
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

export default getShowKeywords;