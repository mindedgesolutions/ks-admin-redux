import pool from "../db.js";
import { StatusCodes } from "http-status-codes";
import { checkPassword, hashPassword } from "../utils/passwordUtils.js";
import { BadRequestError } from "../errors/customErrors.js";
import { v4 as uuidv4 } from "uuid";
import { getApplicationId } from "../utils/functions.js";

export const updateUserUuid = async (req, res) => {
  for (let index = 1500000; index < 2000000; index++) {
    const uuid = uuidv4();
    await pool.query(
      `update k_migrant_worker_master set uuid=$1 where uuid is null and id=$2`,
      [uuid, index]
    );
  }
  res.status(StatusCodes.OK).json({ data: `success` });
};

// Admin panel related starts ------
export const getCurrentAdminUser = async (req, res) => {
  const { userId } = req.user;
  const text = `SELECT "users".*, "role"."rid", "role"."name" as "role_name" FROM "users" INNER JOIN "users_roles" ON "users"."uid" = "users_roles"."uid" INNER JOIN "role" ON "users_roles"."rid" = "role"."rid" where "users"."uid"=$1`;
  const values = [userId];
  const data = await pool.query(text, values);

  res.status(StatusCodes.OK).json({ data });
};

export const updateUser = async (req, res) => {
  const { userId } = req.user;
  const { name, email, mobile, username, avatar } = req.body;

  const text = `update users set name=$1, mail=$2, mobile=$3, username=$4 where uid=$5`;
  const values = [name, email, mobile, username, userId];
  const update = await pool.query(text, values);

  res.status(StatusCodes.ACCEPTED).json({ msg: `User updated` });
};

export const updatePassword = async (req, res) => {
  const { userId } = req.user;
  const { oldPass, newPass } = req.body;
  const existingText = `select password from users where id=$1`;
  const existingValues = [userId];
  const existingData = await pool.query(existingText, existingValues);
  const check = await checkPassword(oldPass, existingData.rows[0].password);
  if (!check) throw new BadRequestError(`Incorrect old password`);
  const password = await hashPassword(newPass);
  const text = `update users set password=$1 where id=$2`;
  const values = [password, userId];
  await pool.query(text, values);

  res
    .status(StatusCodes.ACCEPTED)
    .json({ msg: `Password updated successfully` });
};
// Admin panel related ends ------

// User App related starts ------
export const getCurrentAppUser = async (req, res) => {
  const { mobile, applicationId } = req.appUser;

  const text = `select id, mobile, name, identification_number, created_date, status from k_migrant_worker_master where mobile=$1`;
  const values = [mobile];
  const data = await pool.query(text, values);

  res.status(StatusCodes.OK).json({ data });
};
// User App related ends ------
