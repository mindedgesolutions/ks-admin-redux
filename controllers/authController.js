import pool from "../db.js";
import { StatusCodes } from "http-status-codes";
import { checkPassword, hashPassword } from "../utils/passwordUtils.js";
import { BadRequestError } from "../errors/customErrors.js";
import { createJWT, createUserJWT } from "../utils/tokenUtils.js";

// Admin panel related starts ------
export const updatePassword = async (req, res) => {
  const password = await hashPassword("welcome123");
  console.log(password);
  const text = `update users set pass=$1 where uid=$2`;
  const values = [password, 43];
  await pool.query(text, values);
  res.status(StatusCodes.ACCEPTED).json({ msg: `password updated` });
};

export const login = async (req, res) => {
  const { username, password, captcha, inputCaptcha } = req.body;
  if (captcha !== inputCaptcha)
    throw new BadRequestError(`Incorrect captcha entered`);
  const text = `SELECT "users"."uid", "users"."pass", "role"."name" FROM "users" INNER JOIN "users_roles" ON "users"."uid" = "users_roles"."uid" INNER JOIN "role" ON "users_roles"."rid" = "role"."rid" where "users"."name"=$1`;
  const values = [username];
  const user = await pool.query(text, values);
  if (user.rowCount === 0) throw new BadRequestError(`User doesn't exist`);
  const check = await checkPassword(password, user.rows[0].pass);
  if (!check) throw new BadRequestError(`Incorrect password`);

  const token = createJWT({
    userId: user.rows[0].uid,
    role: user.rows[0].role,
  });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ token });
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User logged out" });
};
// Admin panel related ends ------

// Application User related starts ------
export const generateOtp = async (req, res) => {
  const { mobile } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  await pool.query(
    `insert into k_otp_history(user_role, mobile_number, security_code, is_active) values($1, $2, $3, $4)`,
    [1, mobile, otp, 1]
  );

  res.status(StatusCodes.CREATED).json({ data: otp });
};

export const updateOtp = async (req, res) => {
  const { newOtp, mobile } = req.body;
  await pool.query(
    `update k_otp_history set security_code=$1 where mobile_number=$2 order by id desc limit 1`,
    [newOtp, mobile]
  );
  res.status(StatusCodes.OK).json({ data: `success` });
};

export const otpLogin = async (req, res) => {
  const { mobile } = req.body;
  try {
    await pool.query("BEGIN");

    const data = await pool.query(
      `select id from k_migrant_worker_master where mobile=$1`,
      [mobile]
    );
    const applicationId = data.rowCount > 0 ? data.rows[0].id : null;

    const usertoken = createUserJWT({
      mobile: mobile,
      applicationId: applicationId,
    });

    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("usertoken", usertoken, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
    });

    const access = await pool.query(
      `select kwd.engaged_as from k_migrant_work_details kwd join k_migrant_worker_master kwm on kwm.id = kwd.application_id where kwm.mobile=$1`,
      [mobile]
    );
    const userAccess = access?.rows[0]?.engaged_as ? true : false;

    await pool.query("COMMIT");

    res.status(StatusCodes.OK).json({ userAccess });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.log(error);
    throw new BadRequestError(`Something went wrong! Please try again later`);
  }
};

export const appLogout = async (req, res) => {
  res.cookie("usertoken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User logged out" });
};
// Application User related ends ------
