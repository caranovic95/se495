import express from 'express';
import productRoutes from '../../product/routes/index';
import categoryRoutes from '../../category/routes/index';
import userRoutes from '../../user/routes/index'
import keywordRoutes from '../../keyword/routes/index'

const router = express.Router();

router.use(productRoutes);
router.use(categoryRoutes);
router.use(userRoutes);
router.use(keywordRoutes)

export default router;