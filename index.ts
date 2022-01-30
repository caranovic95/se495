import express from 'express';
import bodyParser from 'body-parser';
import routes from './src/common/routes';
import { sequelize } from './src/common/connectors/database';


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);
sequelize.authenticate()
    .then(() => console.log('Database connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

export default app;