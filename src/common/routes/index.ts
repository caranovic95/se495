import express from 'express';
import productRoutes from '../../product/routes/index';
import categoryRoutes from '../../category/routes/index';

const router = express.Router();

router.use( productRoutes);
router.use( categoryRoutes);

export default router;