const Product = require('../models/product');
const productsService = require('../services/ProductsService');
const logError = require('../utils/errorLoger');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        title: 'Add product page',
        editMode: false,
        path: '/admin/add-product'
    });
};

exports.getEditProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await productsService.findById(productId);
        res.render('admin/add-product', {
            title: `Edit product: ${product.title}`,
            editMode: true,
            product: product,
            path: '/admin/edit-product'
        });
    } catch (e) {logError(e, 'adminController.js', 'getEditProduct')}
};

exports.postEditProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        await productsService.update(productId, req);
        res.redirect('/admin/admin-products');
    } catch (e) {logError(error, 'adminController.js', 'postEditProduct')}
};

exports.getAdminProducts = async (req, res, next) => {
    // req.user.getProducts() // For products which belongs to current user.
    try {
        const products = await productsService.fetchAll();
        res.render('admin/admin-products', {
            title: 'Admin products',
            path: '/admin/admin-products',
            prods: products
        })
    } catch (e) {logError(e, 'adminController.js', 'getAdminProducts')}
};

exports.postAddProduct = async (req, res, next) => {
    try {
        const {title, imageUrl, price, description} = req.body;
        const userId = req.user._id;
        const product = new Product(
            title,
            price,
            imageUrl || 'https://shopdocs.midocean.com/thumb/th_MO9049_03.jpg',
            description,
            userId
        );
        await productsService.save(product);
        res.redirect('/');
    } catch (e) {logError(e, 'adminController', 'postAddProduct')}
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        await productsService.delete(productId);
        res.redirect('/admin/admin-products');
    } catch (e) {logError(e, 'adminController', 'deleteProduct')}
};