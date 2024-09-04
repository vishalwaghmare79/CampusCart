const express = require('express');
const { registerController, loginController, adminAuthController, userAuthController } = require('../controllers/authController');
const { requireSignIn, isAdmin } = require('../middleware/authMidleware');

const router = express.Router();

// Route for user registration - handles POST requests to /register
router.post('/register', registerController);

// Route for user login - handles POST requests to /login
router.post('/login', loginController);

// Route for verifying admin functionality - requires sign-in and admin access
router.get('/verify-admin', requireSignIn, isAdmin, adminAuthController);

// Route for verifying user authentication status
router.get('/verify-user', requireSignIn, userAuthController);


module.exports = router;
