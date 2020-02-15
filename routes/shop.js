const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.post('/products/product-details/:productId', shopController.getProductDetails);
router.get('/cart', shopController.getCart);
router.post('/cart/:productId', shopController.postCart);
router.post('/cart/delete-product/:productId', shopController.postCartDeleteProduct);
// router.get('/orders', shopController.getOrders);
// router.post('/create-order', shopController.postCreateOrder);

module.exports = router;