const Product = require('../models/product');
const ProductsService = require('../services/ProductsService');
const CartService = require('../services/CartService');
// const CartItem = require('../models/cart-item');
const logError = require('../utils/errorLoger');

exports.getIndex = (req, res, next) => {
    res.render('shop/index', {
        title: 'index',
        path: '/'
    });
};

// /products GET products and render page.
exports.getProducts = async (req, res, next) => {
    try {
        const products = await ProductsService.fetchAll();
        res.render('shop/products', {
            title: 'products',
            path: '/products',
            products: products
        })
    } catch (e) { logError(e, 'shopController.js', 'getProduct') }
};

// /products/product-details/ GET single product details and render page.
exports.getProductDetails = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await ProductsService.findById(productId);
        res.render(`shop/product-details`, {
            title: `${productId} details`,
            path: `${productId}`,
            product: product
        })
    } catch (e) { logError(e, 'shopController.js', 'getProductDetails') }
};

exports.getCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const products = await CartService.getCart(userId);
        res.render('cart/cart', {
            title: 'Cart',
            path: '/cart',
            products: products
        });
    } catch (e) { logError(e, 'shopController', 'getCart') }
};

exports.postCart = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const userId = req.user._id;
        await CartService.addToCart(userId, productId);
        res.redirect('/cart');
    } catch (e) {
        logError(e, 'postCart', 'shopController.js')
    }
};

exports.postCartDeleteProduct = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;
        await CartService.deleteProduct(userId, productId);
        res.redirect('/cart');
    } catch (e) {logError(e, 'shopController', 'postCartDeleteProduct')}
};

// exports.getOrders = async (req, res, next) => {
//     try {
//         const orders = await req.user.getOrders();
//         const items = [];
//         console.log(orders);
//         orders.forEach(order => items.push({orderId: order.id}));
//         console.log(items);
//         res.render('shop/orders', {
//             title: 'orders',
//             path: '/orders',
//             products: null
//         })
//     } catch (e) { logError(e, 'shopController.js', 'getProduct') }
// };
//
// exports.postCreateOrder = async (req, res, next) => {
//     try {
//         const cart = await req.user.getCart();
//         const products = await cart.getProducts();
//         let order;
//         if (cart && products) {
//             order = await req.user.createOrder();
//             order.addProducts(products.map(product => {
//                 product.orderItems = {quantity: product.cartItem.quantity};
//                 return product;
//             }));
//             cart.setProducts(null);
//         }
//     } catch (e) {logError(e, 'shopController.js', 'postCreateOrder')}
//     res.redirect('/orders')
// };