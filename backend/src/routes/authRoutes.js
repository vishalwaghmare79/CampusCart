import express from 'express'
import { registerController, loginController, requestPasswordReset, verifyOTP, setNewPassword,  } from '../controllers/authController.js'
const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);

router.post('/reset-password', requestPasswordReset); // Send OTP

router.post('/reset-password/verify', verifyOTP); // Verify OTP and reset password

router.post('/reset-password/new-password', setNewPassword); // set new password

export const authRoutes = router;
