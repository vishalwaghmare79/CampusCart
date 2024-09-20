const express = require('express');
const { registerController, loginController, adminAuthController, userAuthController, getOrdersController, getAllOrdersController, orderStatusController } = require('../controllers/authController');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Route for user registration - handles POST requests to /register
router.post('/register', registerController);

// Route for user login - handles POST requests to /login
router.post('/login', loginController);

// Route for verifying admin functionality - requires sign-in and admin access
router.get('/verify-admin', requireSignIn, isAdmin, adminAuthController);

// Route for verifying user authentication status
router.get('/verify-user', requireSignIn, userAuthController);

// orders
router.get('/orders', requireSignIn, getOrdersController)

// all orders for admin dashboard
router.get('/all-orders', requireSignIn,isAdmin, getAllOrdersController)

// order status update
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController)

module.exports = router;
