import { Sequelize } from 'sequelize-typescript';
import * as Models from '../models/index';
import config from '../helpers/config';

const sequelize = new Sequelize(config.get('DATABASE_NAME'), config.get('DATABASE_USER'), config.get('DATABASE_PASS'), {
    host: config.get('DATABASE_HOST'),
    dialect: 'mysql',
    timezone: 'Europe/Belgrade',
    dialectOptions: {
        timezone: 'local',
    },
    pool: {
        min: 1,
        max: 30,
        acquire: 35000,
        idle: 10000,
    },
    models: Object.values(Models),
    logging: config.get('SEQUELIZE_LOGGING') == 'true'
});

// Load all Model scopes
(async () => {
    for (const model of Object.values(Models)) {
        if (typeof model['loadScopes'] == 'function') {
            await model['loadScopes']();
        }
    }
})();

export { sequelize };
