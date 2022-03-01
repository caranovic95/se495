import express from 'express';
import respond from "../../common/middlewares/respond";
import lift from "../../common/middlewares/lift";
import {parseProductData} from "../crawlers/product.crawler";
import getAllProducts from "../db/services/getAll-products.service";
import getProductByMonths from  "../db/services/get-product-months.service";
import deleteProduct from "../db/services/delete-product.service";
import getProductById from "../db/services/get-product.service";
import {updateProduct} from "../db/services/update-product.service";

const router = express.Router();



router
    .route('/product')
    .post(lift(parseProductData),respond);

router
    .route('/product')
    .get(lift(getAllProducts),respond);

router
    .route('/product/:id')
    .get(lift(getProductById),respond);

router
    .route('/product/:id')
    .put(lift(updateProduct),respond);

router
    .route('/products/:product_id')
    .get(lift(getProductByMonths),respond);

router
    .route('/product/:id')
    .delete(lift(deleteProduct),respond);

export default router;