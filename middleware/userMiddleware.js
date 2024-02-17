import { body } from "express-validator";
import { withValidationErrors } from "./withErrorMiddleware.js";
import { isMobileNumber, isValidName } from "../utils/formatValidations.js";
import client from "../db.js";
import { BadRequestError } from "../errors/customErrors.js";

export const validateUserInputs = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage(`Name is required`)
    .isLength({ min: 3, max: 255 })
    .withMessage(`Name must be between 3 to 255 characters`)
    .custom(isValidName)
    .withMessage(`Invalid name format`),
  body("email")
    .notEmpty()
    .withMessage(`Email is required`)
    .isEmail()
    .withMessage(`Invalid email`)
    .custom(async (email, { req }) => {
      const text = `select * from users where uid!=$1 and mail=$2`;
      const values = [req.user.userId, email];
      const data = await client.query(text, values);
      if (data.rowCount > 0) throw new BadRequestError(`Email exists`);
    }),
  body("mobile")
    .notEmpty()
    .withMessage(`Mobile is required`)
    .custom(isMobileNumber)
    .withMessage(`Invalid mobile no.`)
    .custom(async (mobile, { req }) => {
      const text = `select * from users where uid!=$1 and mobile=$2`;
      const values = [req.user.userId, mobile];
      const data = await client.query(text, values);
      if (data.rowCount > 0) throw new BadRequestError(`Mobile exists`);
    }),
  body("username")
    .notEmpty()
    .withMessage(`Username is required`)
    .isLength({ min: 3, max: 255 })
    .withMessage(`Username must be between 3 to 255 characters`)
    .custom(async (username, { req }) => {
      const text = `select * from users where uid!=$1 and username=$2`;
      const values = [req.user.userId, username];
      const data = await client.query(text, values);
      if (data.rowCount > 0)
        throw new BadRequestError(`Username is already taken`);
    }),
]);

export const validatePassInputs = withValidationErrors([
  body("oldPass").notEmpty().withMessage(`Old password is required`),
  body("newPass")
    .notEmpty()
    .withMessage(`New password is required`)
    .isLength({ min: 6, max: 15 })
    .withMessage(`Password must be between 6 to 15 characters`),
  body("confirmPass")
    .notEmpty()
    .withMessage(`Password confirmation is required`)
    .custom((confirmPass, { req }) => {
      if (confirmPass !== req.body.newPass)
        throw new BadRequestError(`Password confirmation failed`);
      return true;
    }),
]);
