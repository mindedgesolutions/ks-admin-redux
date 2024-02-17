import { body } from "express-validator";
import { withValidationErrors } from "./withErrorMiddleware.js";
import { isMobileNumber } from "../utils/formatValidations.js";
import pool from "../db.js";
import { BadRequestError } from "../errors/customErrors.js";

export const validateMobileInput = withValidationErrors([
  body("mobile")
    .notEmpty()
    .withMessage(`Enter a valid mobile no.`)
    .custom(isMobileNumber)
    .withMessage(`Invalid mobile no. Mobile no. must be of 10 digits`),
]);

export const validateOtpLogin = withValidationErrors([
  body("inputOtp")
    .notEmpty()
    .withMessage(`Enter OTP`)
    .custom(async (value, { req }) => {
      const dbOtp = await pool.query(
        `select security_code from k_otp_history where mobile_number=$1 order by id desc limit 1`,
        [req.body.mobile]
      );
      if (dbOtp.rows[0].security_code !== value) {
        throw new BadRequestError(`Incorrect OTP entered`);
      }
      return true;
    }),
  body("inputCaptcha")
    .notEmpty()
    .withMessage(`Enter total of the numbers displayed`)
    .custom((value, { req }) => {
      if (req.body.captchaTotal !== value) {
        throw new BadRequestError(`Captcha total doesn't match. Try again`);
      }
      return true;
    }),
]);
