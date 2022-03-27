import {User} from "../models/user.model";
import Logger from '../../common/helpers/logger';
import {randomUUID} from "crypto";
import * as crypto from 'src/common/helpers/crypto';
import {Product} from "../../product/db/models/product.model";
import bcrypt from 'bcrypt';
import {NotFoundError} from "../../common/helpers/errors";
import * as errors from '../../common/helpers/errors';
import {sign, verify} from "jsonwebtoken";

const logger = Logger.get('CREATE-USER');


const _validateEmail = async (email: string): Promise<any> => {
    try {
        const existingUser = await User.findOne({
            where: {
                email
            }
        });
        if (!existingUser) {
            console.log(`User with email ${email} not found`);
        }
        return existingUser;
    } catch (e) {
        console.log(e);
        throw new Error(e);

    }
};

const loginUser = async (input): Promise<any> => {
    try {

        let authenticateUser = await _validateEmail(input.email);
        if (!await bcrypt.compare(input.password, authenticateUser.password)) {
            logger.error(`Invalid credentials`);
            return new errors.InvalidCredentials('INVALID_CREDENTIALS', 404);
        }

        const token = sign({id: authenticateUser.id}, process.env.SECRET_KEY);
        console.log(token)
        const payload = verify(token, process.env.SECRET_KEY)


        let user = await User.scope('public').findByPk(payload['id']);
        console.log(user);
        return {
            user,
            token
        };

    } catch (e) {
        logger.error(`Creation of user ${input.email} failed `, e);
        throw e;
    }
};
export const AuthenticatedUser = async (input) => {
    try {

        let token = input.authorization;
        token = token.split('Bearer ')[1];
        const payload = verify(token, process.env.SECRET_KEY)
        let user = await User.scope('public').findByPk(payload['id']);
        return user;
    } catch (e) {
        console.log(e)
    }

}
export {loginUser};