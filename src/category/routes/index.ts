import express from 'express';
import {parseCategoryData} from "../crawlers/category.crawler";
import respond from "../../common/middlewares/respond";
import lift from "../../common/middlewares/lift";
import getCategories from '../../category/db/services/get-categories.service'
import getCategoryById from "../db/services/get-category.service";


const router = express.Router();


router
    .route('/category')
    .post(lift(parseCategoryData),respond)


router
    .route('/categories')
    .get(lift(getCategories),respond);
router
    .route('/categories/:id')
    .get(lift(getCategoryById),respond);

export default router;