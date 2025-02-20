import express from 'express';
import { createCategoryController, deleteCategoryController, getCategoryController, getSingleCategoryController, updateCategoryController } from '../controllers/categoryController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { uploadImage } from './../middlewares/uploadImage.js';

const router = express.Router();

router.post('/create-category', requireSignIn, isAdmin, uploadImage.single("image"), createCategoryController);

router.put('/update-category/:id', requireSignIn, isAdmin, uploadImage.single("image"), updateCategoryController);

router.get('/get-category', getCategoryController);

router.get('/single-category/:slug', getSingleCategoryController);

router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);


export const categoryRoutes = router;