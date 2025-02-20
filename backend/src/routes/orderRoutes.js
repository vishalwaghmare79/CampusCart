import { createOrderController, getOrderController, verifyPaymentController } from "../controllers/orderController.js";
import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Base URL: localhost:3000/api/v1/order
router.post("/create-order", createOrderController);  // Initiate Payment
router.post("/verify-payment", requireSignIn, verifyPaymentController); // Verify Payment & Place Order
router.get("/get-order",requireSignIn, getOrderController);

export const orderRoutes = router;
