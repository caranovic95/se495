import bcrypt from 'bcrypt';
import config from './config';

const salt = +config.get('PASSWORD_SALT') ?? 10;

export const hash = async (plain: string): Promise<string> => {
    return bcrypt.hash(plain, salt);
};