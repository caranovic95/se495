import express from 'express';
import bodyParser from 'body-parser';
import routes from './src/common/routes';
import {sequelize} from './src/common/connectors/database';
const cors = require('cors');


const app = express();
const PORT = 3000;


app.use(cors({credentials: true, origin: 'http://localhost:3001'}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');

    next();
});
app.use(bodyParser.json());
//app.use(express.cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', routes);
sequelize.authenticate()
    .then(() => console.log('Database connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

export default app;