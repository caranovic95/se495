import express from 'express';
import {parseCategoryData} from "../crawlers/category.crawler";
import respond from "../../common/middlewares/respond";
import lift from "../../common/middlewares/lift";


const router = express.Router();


router
    .route('/category')
    .post(lift(parseCategoryData),respond);




export default router;