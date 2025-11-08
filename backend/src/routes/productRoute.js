import express from 'express'
import { createProductController, getProductController, getProductByCategoryController, getUserProductsController, getAllProductsForAdminController, getSingleProductController, deleteProductController, updateProductController, searchProductController } from '../controllers/productController.js';
import { requireSignIn, verifyLogin } from '../middlewares/authMiddleware.js';
import { upload, uploadImage } from '../middlewares/uploadImage.js';
const router = express.Router();

router.post('/create-product', requireSignIn, upload.single("image"), uploadImage, createProductController); // create product

router.put('/update-product/:id', requireSignIn, upload.single('image'), uploadImage, updateProductController); // update product

router.get('/get-products',verifyLogin, getProductController); // get all products

router.delete('/delete-product/:id', requireSignIn, deleteProductController); // delete product

router.get('/get-products/:id', getProductByCategoryController); // get products by category

router.get('/get-product/:productId', getSingleProductController); // get single product

router.get('/user-products',requireSignIn, getUserProductsController); // get products by user

router.get("/admin/products", requireSignIn, getAllProductsForAdminController); // get all products for admin

router.get('/search/:keyword', searchProductController) // search product

export const productRoutes = router;
