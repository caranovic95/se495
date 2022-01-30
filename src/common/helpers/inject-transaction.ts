import { sequelize } from '../connectors/database';

const injectTransaction = (fn, options = {}) => {
    return (input) => {
        return sequelize.transaction(options, async (tx) => { return await fn({ ...input, tx }); });
    };
};

export {
    injectTransaction,
};
