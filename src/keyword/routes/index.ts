import express from 'express';
import respond from "../../common/middlewares/respond";
import lift from "../../common/middlewares/lift";
import {parseProductKeywordData} from "../crawlers/keyword_product.crawler";
import getKeywords from "../db/services/get-keywords.service";
import createKeyword from "../db/services/insert-keywords.service";
import {verifyToken} from "../../common/middlewares/auth";

const router = express.Router();


router
    .route('/keyword_product')
    .post(verifyToken, lift(parseProductKeywordData), respond);
router
    .route('/keyword')
    .post(verifyToken, lift(createKeyword), respond);
router
    .route('/keywords')
    .get(verifyToken, lift(getKeywords), respond);


export default router;