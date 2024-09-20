const express = require('express');
const { addWishlistController, removeWishlistController, getWishlistController } = require('../controllers/wishlistController');
const { requireSignIn } = require('../middleware/authMiddleware'); 
const router = express.Router();

// Add product to wishlist
router.post('/add-wishlist', requireSignIn, addWishlistController);

// Remove product from wishlist
router.delete('/remove-wishlist/:wishlistId', requireSignIn, removeWishlistController);

// Get wishlist items for a user
router.get('/', requireSignIn, getWishlistController);

module.exports = router; 