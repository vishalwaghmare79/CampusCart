import express from 'express';
import { createCategoryController, deleteCategoryController, getCategoryController, getSingleCategoryController, updateCategoryController } from '../controllers/categoryController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { upload, uploadImage } from './../middlewares/uploadImage.js';

const router = express.Router();

router.post('/create-category', requireSignIn, isAdmin, upload.single("image"), uploadImage, createCategoryController);

router.put('/update-category/:id', requireSignIn, isAdmin, upload.single("image"), uploadImage, updateCategoryController);

router.get('/get-category', getCategoryController);

router.get('/single-category/:slug', getSingleCategoryController);

router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);


export const categoryRoutes = router;
