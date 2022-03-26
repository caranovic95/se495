import express from 'express';
import {parseCategoryData} from "../crawlers/category.crawler";
import respond from "../../common/middlewares/respond";
import lift from "../../common/middlewares/lift";
import getCategories from '../../category/db/services/get-categories.service'
import getCategoryById from "../db/services/get-category.service";
import {verifyToken} from "../../common/middlewares/auth";


const router = express.Router();


router
    .route('/category')
    .post(verifyToken, lift(parseCategoryData), respond)


router
    .route('/categories')
    .get(verifyToken, lift(getCategories), respond);
router
    .route('/category/:id')
    .get(verifyToken, lift(getCategoryById), respond);

export default router;