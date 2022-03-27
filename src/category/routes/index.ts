import express from 'express';
import {parseCategoryData} from "../crawlers/category.crawler";
import respond from "../../common/middlewares/respond";
import lift from "../../common/middlewares/lift";
import getCategories from '../../category/db/services/get-categories.service'
import getCategoryById from "../db/services/get-category.service";
import {verifyToken} from "../../common/middlewares/auth";
import getCategoriesPage from "../db/services/get-categories-per-page.service";


const router = express.Router();


router
    .route('/category')
    .post(verifyToken, lift(parseCategoryData), respond)


router
    .route('/categories')
    .get(verifyToken, lift(getCategories), respond);
router
    .route('/categories_page')
    .get(verifyToken, lift(getCategoriesPage), respond);
router
    .route('/category/:id')
    .get(verifyToken, lift(getCategoryById), respond);

export default router;