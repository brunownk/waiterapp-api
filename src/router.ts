import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { createCategory } from './App/useCases/categories/createCategory';
import { listCategories } from './App/useCases/categories/listCategories';
import { createProducts } from './App/useCases/products/createProducts';
import { listProducts } from './App/useCases/products/listProducts';
import { listProductsByCategory } from './App/useCases/categories/listProductsByCategory';
import { listOrders } from './App/useCases/orders/listOrders';
import { createOrder } from './App/useCases/orders/createOrder';
import { changeOrderStatus } from './App/useCases/orders/changeOrderStatus';
import { cancelOrder } from './App/useCases/orders/cancelOrder';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.resolve(__dirname, '..' , 'uploads'));
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

// List categories
router.get('/categories', listCategories);

// Create category
router.post('/categories', createCategory);

// List products
router.get('/products', listProducts);

// Create product
router.post('/products', upload.single('image'), createProducts);

// Get procuts by category
router.get('/categories/:categoryId/products', listProductsByCategory);

// List orders
router.get('/orders', listOrders);

// Create orders
router.post('/orders', createOrder);

// Change order status
router.patch('/orders/:orderId', changeOrderStatus);

// Delete/cancel order
router.delete('/orders/:orderId', cancelOrder);
