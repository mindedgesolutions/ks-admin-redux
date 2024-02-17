import { body } from "express-validator";
import pool from "../db.js";
import { withValidationErrors } from "./withErrorMiddleware.js";
import {
  isValidName,
  isMobileNumber,
  isAadhaarNumber,
  isValidPin,
} from "../utils/formatValidations.js";
import { BadRequestError } from "../errors/customErrors.js";
import dayjs from "dayjs";
import { verifyUserJWT } from "../utils/tokenUtils.js";
import isBetween from "dayjs/plugin/isBetween.js";
dayjs.extend(isBetween);

// Personal information form validation starts ------
export const validatePersonal = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage(`Name is required`)
    .isLength({ min: 3, max: 255 })
    .withMessage(`Name must be between 3 to 255 characters`)
    .custom(isValidName)
    .withMessage(`Invalid name format`),
  body("fatherHusbandName")
    .notEmpty()
    .withMessage(`Father / Husband's name is required`)
    .isLength({ min: 3, max: 255 })
    .withMessage(`Name must be between 3 to 255 characters`)
    .custom(isValidName)
    .withMessage(`Invalid name format`),
  body("gender").notEmpty().withMessage(`Select gender`),
  body("dob")
    .notEmpty()
    .withMessage(`Enter date of birth`)
    .custom((value) => {
      const birthDate = dayjs(value);
      const today = dayjs(dayjs().format("YYYY-MM-DD"));
      const age = today.diff(birthDate, "y");
      if (age < 14) {
        throw new BadRequestError(`Minimum age must be 14`);
      }
      return true;
    }),
  body("category").notEmpty().withMessage(`Select category`),
  body("religion").notEmpty().withMessage(`Select religion`),
  body("religionOther")
    .if(body("religion").equals("9"))
    .notEmpty()
    .withMessage(`Enter religion`)
    .isLength({ min: 3, max: 255 })
    .withMessage(`Religion must be between 3 to 255 characters`)
    .custom(isValidName)
    .withMessage(`Invalid format`),
  body("emergencyMobile")
    .notEmpty()
    .withMessage(`Enter emergency contact no.`)
    .isNumeric()
    .withMessage(`Emergency contact must be a number`)
    .custom(isMobileNumber)
    .withMessage(`Invalid Emergency contact no.`),
  body("aadhaar")
    .notEmpty()
    .withMessage(`Enter Aadhaar no.`)
    .custom(isAadhaarNumber)
    .withMessage(`Invalid Aadhaar no.`)
    .custom(async (value, { req }) => {
      const { mobile } = verifyUserJWT(req.cookies.usertoken);
      const checkApproved = await pool.query(
        `select id from k_migrant_worker_master where approved_aadhar=$1`,
        [value]
      );
      if (checkApproved.rowCount > 0) {
        throw new BadRequestError(`Aadhaar card no. exists`);
      }
      const checkUser = await pool.query(
        `select id from k_migrant_worker_master where approved_aadhar=$1 and mobile!=$2`,
        [value, mobile]
      );
      if (checkUser.rowCount > 0) {
        throw new BadRequestError(`Aadhaar card no. exists`);
      }
      return true;
    }),
  body("epic").custom((value, { req }) => {
    const { dob } = req.body;
    const birthDate = dayjs(dob);
    const today = dayjs(dayjs().format("YYYY-MM-DD"));
    const age = today.diff(birthDate, "y");
    if (age >= 18 && !value) {
      throw new BadRequestError(`EPIC no. is required`);
    }
    return true;
  }),
  body("permanentAddress")
    .notEmpty()
    .withMessage(`Permanent address is required`)
    .isLength({ min: 5, max: 255 })
    .withMessage(`Permanent address must be between 5 to 255 characters`),
  body("district").notEmpty().withMessage(`Select a district`),
  body("subDiv").notEmpty().withMessage(`Select sub-division`),
  body("subDiv").notEmpty().withMessage(`Select sub-division`),
  body("blType").notEmpty().withMessage(`Select area type`),
  body("blCode").notEmpty().withMessage(`Select area code`),
  body("gpCode").notEmpty().withMessage(`Select gram panchayat name`),
  body("psCode").notEmpty().withMessage(`Select police station`),
  body("pin")
    .notEmpty()
    .withMessage(`Enter PIN code`)
    .custom(isValidPin)
    .withMessage(`PIN code must be a 6 digit number`),
  body("qualification").notEmpty().withMessage(`Select qualification`),
  body("skill").notEmpty().withMessage(`Select if you have a technical skill`),
  body("skillDesc")
    .if(body("skill").equals("yes"))
    .notEmpty()
    .withMessage(`Mention your technical skill`),
]);
// Personal information form validation ends ------

// Worksite information form validation starts ------
export const validateWorksite = withValidationErrors([
  body("workAddress")
    .notEmpty()
    .withMessage(`Enter worksite address`)
    .isLength({ min: 10, max: 255 })
    .withMessage(`Worksite address must be between 10 to 255 characters`),
  body("country").notEmpty().withMessage(`Select a country`),
  body("stateCode")
    .if(body("country").equals("1"))
    .notEmpty()
    .withMessage(`Select state`),
  body("countryName")
    .if(body("country").equals("2"))
    .notEmpty()
    .withMessage(`Enter country name`)
    .isLength({ min: 3, max: 255 })
    .withMessage(`Country name must be between 3 to 255 characters`),
  body("passportNo")
    .if(body("country").equals("2"))
    .notEmpty()
    .withMessage(`Enter passport no.`),
  body("workPs")
    .notEmpty()
    .withMessage(`Enter worksite police station name`)
    .isLength({ min: 3, max: 255 })
    .withMessage(`Police station name must be between 3 to 255 characters`),
  body("empNature").notEmpty().withMessage(`Select nature of employment`),
  body("migDate")
    .notEmpty()
    .withMessage(`Enter migration date`)
    .custom((value) => {
      let today = dayjs();
      let startDate = today.subtract(12, "month");
      startDate = startDate.format("YYYY-MM-DD");

      let endDate = today.add(1, "month");
      endDate = endDate.format("YYYY-MM-DD");

      const startDateLabel = dayjs().subtract(12, "month").format("DD/MM/YYYY");
      const endDateLabel = dayjs().add(1, "month").format("DD/MM/YYYY");

      const ifBetween = dayjs(value).isBetween(startDate, endDate, "day", []);
      if (!ifBetween) {
        throw new BadRequestError(
          `Migration date must be between ${startDateLabel} and ${endDateLabel}`
        );
      }
      return true;
    }),
  body("expectedWages")
    .isNumeric()
    .withMessage(`Expected salary must be a number`)
    .optional({ checkFalsy: true }),
]);
// Worksite information form validation ends ------

// Agency information form validation starts ------
export const validateAgency = withValidationErrors([
  body("empType").notEmpty().withMessage(`Select employment type`),
  body("empMobile")
    .if(body("empType").equals("Agency"))
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage(`Mobile no. must be a number`),
  body("agentName")
    .if(body("empType").equals("Agency"))
    .notEmpty()
    .withMessage(`Enter name of the agnecy`),
  body("agentAddress")
    .if(body("empType").equals("Agency"))
    .notEmpty()
    .withMessage(`Enter address of the agnecy`),
  body("agentMobile")
    .if(body("empType").equals("Agency"))
    .notEmpty()
    .withMessage(`Enter mobile no. of the agnecy`)
    .isNumeric()
    .withMessage(`Mobile no. must be a number`),
  body("companyMobile")
    .if(body("empType").equals("Without-agency"))
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage(`Mobile no. must be a number`),
]);
// Agency information form validation ends ------

// Bank & Nominee information form validation starts ------
export const validateBank = withValidationErrors([
  body("ifscCode").notEmpty().withMessage(`Enter bank's IFSC code`),
  body("bankName").notEmpty().withMessage(`Bank name cannot be empty`),
  body("branchName").notEmpty().withMessage(`Branch name cannot be empty`),
  body("accountNo").notEmpty().withMessage(`Enter account no.`),
  body("khadyasathiNo")
    .notEmpty()
    .withMessage(`Enter Khadya Sathi / Ration card no.`),
  body("schemes").notEmpty().withMessage(`Select at least one availed scheme`),
  body("nomineeName")
    .notEmpty()
    .withMessage(`Enter name of the nominee`)
    .custom(isValidName)
    .withMessage(`Invalid name format`),
  body("nomineeRelation")
    .notEmpty()
    .withMessage(`Select relationship with nominee`),
  body("nomineeMobile")
    .notEmpty()
    .withMessage(`Enter nominee's mobile no.`)
    .custom(isMobileNumber)
    .withMessage(`Invalid mobile no.`),
  body("nomineeAadhaar")
    .notEmpty()
    .withMessage(`Enter nominee's Aadhaar card no.`)
    .custom(isAadhaarNumber)
    .withMessage(`Invalid Aadhaar card no.`),
]);
// Add new bank starts ------
export const validateAddNewBank = withValidationErrors([]);

// Add new bank ends ------

// Bank & Nominee information form validation ends ------

// Add family member form validation starts ------
export const validateFamilyMember = withValidationErrors([
  body("memberName")
    .notEmpty()
    .withMessage(`Enter family member's name`)
    .custom(isValidName)
    .withMessage(`Invalid name format`),
  body("memberGender").notEmpty().withMessage(`Select gender`),
  body("memberAge").notEmpty().withMessage(`Enter family member's age`),
  body("memberRelation")
    .notEmpty()
    .withMessage(`Select relation with the member`),
  body("memberAadhaar")
    .notEmpty()
    .withMessage(`Enter family member's Aadhaar no.`)
    .custom(isAadhaarNumber)
    .withMessage(`Invalid Aadhaar no.`),
  body("memberEpic").custom((value, { req }) => {
    const { memberAge } = req.body;
    if (memberAge >= 18 && !value) {
      throw new BadRequestError(`Enter EPIC no.`);
    }
    return true;
  }),
]);
// Add family member form validation ends ------
