const express = require('express');
const { requireSignIn, verifyLogin, isAdmin } = require('../middleware/authMiddleware');
const { createProductController, getProductController, getSingleProductController, deleteProductController, updateProductController, getUserProductsController, braintreePaymentController, braintreeTokenController, searchProductController, getProductByCategoryController, getAllProductsForAdminController } = require('../controllers/productController');
const uploadImage = require('../middleware/uploadImage');

const router = express.Router();

// Route to create a product
router.post('/create-product', requireSignIn, uploadImage.single('image'), createProductController);

// Route to get all products excluding the logged-in user's products
router.get('/get-products',verifyLogin, getProductController);

router.get('/get-products/:id',verifyLogin, getProductByCategoryController);

router.get('/user-products',requireSignIn, getUserProductsController);

router.get("/admin/products", requireSignIn, getAllProductsForAdminController);

router.get('/get-product/:productId', getSingleProductController);

// Route to delete a product (user can only delete their own products)
router.delete('/delete-product/:id', requireSignIn, deleteProductController);

// Route to update a product (user can only update their own products)
router.put('/update-product/:id', requireSignIn,uploadImage.single('image'), updateProductController);

// Payment routes
router.get('/braintree/client_token', braintreeTokenController)

// purchase 
router.post('/braintree/purchase', requireSignIn, braintreePaymentController)

//search product 
router.get('/search/:keyword',verifyLogin, searchProductController)

module.exports = router;
