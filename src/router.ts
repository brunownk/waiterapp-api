import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { createCategory } from './App/useCases/categories/createCategory';
import { listCategories } from './App/useCases/categories/listCategories';
import { createProducts } from './App/useCases/products/createProducts';
import { listProducts } from './App/useCases/products/listProducts';
import { listProductsByCategory } from './App/useCases/categories/listProductsByCategory';

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
router.get('/orders', (req, res) => {
  res.send('OK');
});

// Create orders
router.post('/orders', (req, res) => {
  res.send('OK');
});

// Change order status
router.patch('/orders/:orderId', (req, res) => {
  res.send('OK');
});

// Delete/cancel order
router.delete('/orders/:orderId', (req, res) => {
  res.send('OK');
});
