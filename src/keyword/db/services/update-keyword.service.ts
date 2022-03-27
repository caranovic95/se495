import {injectTransaction} from '../../../common/helpers/inject-transaction';
import getConfigsOfProjectsToRun from "@jest/core/build/getConfigsOfProjectsToRun";
import {Keyword} from "../models/keyword.model";
import {Transaction} from 'sequelize';
import Logger from '../../../common/helpers/logger';

const logger = Logger.get('UPDATE-KEYWORD');

const updateKeyword = async (input: {
    readonly id: number
    keyword: string,
    tx: Transaction,
}): Promise<Keyword> => {
    try {
        const keyword = await Keyword.findOne({where: {id: input.id}});
        if (!keyword) {
            logger.error(`The keyword with id ${input.id} was not found`);
            throw new Error('update keyword error');
        }

        keyword.keyword = input.keyword;

        await keyword.save({transaction: input.tx});
        return await Keyword.scope('public').findByPk(keyword.id, {transaction: input.tx});
    } catch (e) {
        logger.error('Update of role failed ', e);
        throw e;
    }
};


export {updateKeyword};