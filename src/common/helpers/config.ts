import * as dotenv from 'dotenv';

dotenv.config();

const get = (field: string): string => {
    return process.env[field];
};

export default {
    get
};