const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/admin-products', adminController.getAdminProducts);
router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);
router.post('/edit-product/:productId', adminController.postEditProduct);
router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/delete-product/:productId', adminController.deleteProduct);

module.exports = router;