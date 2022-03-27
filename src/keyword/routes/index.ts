import express from 'express';
import respond from "../../common/middlewares/respond";
import lift from "../../common/middlewares/lift";
import {parseProductKeywordData} from "../crawlers/keyword_product.crawler";
import getKeywords from "../db/services/get-keywords.service";
import createKeyword from "../db/services/insert-keywords.service";
import {verifyToken} from "../../common/middlewares/auth";
import getAllKeywordProducts from "../db/services/get-keyword_products.service";
import getShowKeywords from "../db/services/get-show-keywords.service";
import {updateKeyword} from "../db/services/update-keyword.service";
import deleteKeyword from "../db/services/delete-keyword.service";
import getKeywordById from "../db/services/get-keyword.service";
import deleteKeywordProduct from "../db/services/delete-keyword_product.service";
import {updateKeywordProduct} from "../db/services/update-keyword-product.service";
import getKeywordProductByMonths from "../db/services/get-keyword-product-month.service";
import getKeywordProductById from "../db/services/get-keyword-product.service";

const router = express.Router();


router
    .route('/keyword_product')
    .post(verifyToken, lift(parseProductKeywordData), respond);
router
    .route('/keyword_product/:id')
    .get(verifyToken, lift(getKeywordProductById), respond);
router
    .route('/keyword_products')
    .get(verifyToken, lift(getAllKeywordProducts), respond);
router
    .route('/keyword_products/:product_id')
    .get(verifyToken, lift(getKeywordProductByMonths), respond);
router
    .route('/keyword')
    .post(verifyToken, lift(createKeyword), respond);
router
    .route('/keywords')
    .get(verifyToken, lift(getKeywords), respond);
router
    .route('/keyword/:id')
    .put(verifyToken, lift(updateKeyword), respond);
router
    .route('/keyword_product/:id')
    .put(verifyToken, lift(updateKeywordProduct), respond);
router
    .route('/keyword/:id')
    .delete(verifyToken, lift(deleteKeyword), respond);
router
    .route('/keyword_product/:id')
    .delete(verifyToken, lift(deleteKeywordProduct), respond);
router
    .route('/keyword/:id')
    .get(verifyToken, lift(getKeywordById), respond);
router
    .route('/keywords_show')
    .get(verifyToken, lift(getShowKeywords), respond);

export default router;