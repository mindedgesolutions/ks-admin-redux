import { Router } from "express";
const router = Router();
import {
  appLogout,
  generateOtp,
  login,
  logout,
  otpLogin,
  updatePassword,
} from "../controllers/authController.js";
import { validateLoginInput } from "../middleware/authMiddleware.js";
import {
  validateMobileInput,
  validateOtpLogin,
} from "../middleware/userAuthMiddleware.js";

// Admin routes ------
router.get("/update-password", updatePassword);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);

// User routes ------
router.post("/generate-otp", validateMobileInput, generateOtp);
router.post("/otplogin", validateOtpLogin, otpLogin);
router.get("/user-logout", appLogout);

export default router;
