import express from 'express';
import respond from "../../common/middlewares/respond";
import lift from "../../common/middlewares/lift";
import {parseProductData} from "../crawlers/product.crawler";


const router = express.Router();



router
    .route('/product')
    .post(lift(parseProductData),respond);


export default router;