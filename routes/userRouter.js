import { Router } from "express";
const router = Router();
import {
  getCurrentAdminUser,
  getCurrentAppUser,
  updatePassword,
  updateUser,
} from "../controllers/userController.js";
import {
  validatePassInputs,
  validateUserInputs,
} from "../middleware/userMiddleware.js";
import {
  protectRoute,
  protectUserRoute,
} from "../middleware/protectRouteMiddleware.js";

router.get("/current-user", protectRoute, getCurrentAdminUser);
router.patch("/update-user", protectRoute, validateUserInputs, updateUser);
router.patch(
  "/change-password",
  protectRoute,
  validatePassInputs,
  updatePassword
);

router.get("/current-app-user", protectUserRoute, getCurrentAppUser);

export default router;
