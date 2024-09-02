const express = require('express');
const { registerController, loginController, testController } = require('../controllers/authController');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Route for user registration - handles POST requests to /register
router.post('/register', registerController);

// Route for user login - handles POST requests to /login
router.post('/login', loginController);

// Route for admin test - requires sign-in and admin access
router.get('/test', requireSignIn, isAdmin, testController);

module.exports = router;
