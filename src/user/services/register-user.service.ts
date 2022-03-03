import {User} from "../models/user.model";
import Logger from '../../common/helpers/logger';
import {randomUUID} from "crypto";
import * as crypto from 'src/common/helpers/crypto';
import {Product} from "../../product/db/models/product.model";

const logger = Logger.get('CREATE-USER');


const _validateEmail = async (email: string): Promise<void> => {
    try {
        const existingUser = await User.findOne({
            where: {
                email
            }
        });
        if (existingUser) {
            console.log(`User with email ${email} already exists`);

        }
    } catch (e) {
        console.log(e);
        throw new Error(e);

    }
};

const createUser = async (input: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}): Promise<User | any> => {
    try {

        await _validateEmail(input.email);
        const passwordHashed = await crypto.hash(input.password);
        const created_at=new Date();

        const user = await User.create({
            first_name: input.firstName,
            last_name: input.lastName,
            email: input.email,
            password: passwordHashed,
            created_at:created_at,
        });
        return await User.scope('public').findByPk(user.id);
    } catch (e) {
        logger.error(`Creation of user ${input.email} failed `, e);
        throw e;
    }
};

export { createUser };