const express = require('express');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } = require('../controllers/categoryController');

const router = express.Router();

// Route for creating a new category
// Only accessible to signed-in users with admin privileges
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

// Route for updating an existing category by ID
// Only accessible to signed-in users with admin privileges
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

// Route for retrieving the list of all categories
router.get('/get-category', categoryController);

// Route for retrieving a single category by its slug
router.get('/single-category/:slug', singleCategoryController);

// Route for deleting a category by ID
// Only accessible to signed-in users with admin privileges
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);


module.exports = router;