import { body } from "express-validator";
import { withValidationErrors } from "./withErrorMiddleware.js";

export const validateLoginInput = withValidationErrors([
  body("username").notEmpty().withMessage(`Username is required`),
  body("password").notEmpty().withMessage(`Password is required`),
  body("inputCaptcha").notEmpty().withMessage(`Enter text in the box`),
]);
