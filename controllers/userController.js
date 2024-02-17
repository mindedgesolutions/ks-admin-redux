import pool from "../db.js";
import { StatusCodes } from "http-status-codes";
import { checkPassword, hashPassword } from "../utils/passwordUtils.js";
import { BadRequestError } from "../errors/customErrors.js";

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

  // const text = `select wm.id,
  //   wm.mobile,
  //   wm.name,
  //   wm.identification_number,
  //   wbn.application_id as nominee,
  //   wf.application_id as family
  //   from k_migrant_worker_master as wm
  //   left join (
  //     select k_migrant_worker_nominees.application_id from k_migrant_worker_nominees where k_migrant_worker_nominees.is_active=1 group by k_migrant_worker_nominees.application_id
  //   ) as wbn on wbn.application_id = wm.id
  //   left join (
  //     select k_migrant_family_info.application_id from k_migrant_family_info where k_migrant_family_info.is_active=1 group by k_migrant_family_info.application_id
  //   ) as wf on wf.application_id = wm.id
  //   where wm.mobile=$1`;

  const text = `select id, mobile, name, identification_number, created_date, status from k_migrant_worker_master where mobile=$1`;
  const values = [mobile];
  const data = await pool.query(text, values);
  // let accessAgency, accessBank;

  // if (applicationId) {
  //   const workExists = await pool.query(
  //     `select present_country, engaged_as from k_migrant_work_details where application_id=$1`,
  //     [applicationId]
  //   );
  //   accessAgency = workExists.rows[0]?.present_country ? true : false;
  //   accessBank = workExists.rows[0]?.engaged_as ? true : false;
  // } else {
  //   accessAgency = false;
  //   accessBank = false;
  // }

  // const accessWorksite = data.rowCount > 0 ? true : false;
  // const accessFamily = data.rows[0]?.nominee ? true : false;
  // const accessDoc = data.rows[0]?.family ? true : false;
  // const meta = {
  //   personal: true,
  //   worksite: accessWorksite,
  //   agency: accessAgency,
  //   bank: accessBank,
  //   family: accessFamily,
  //   doc: accessDoc,
  // };

  res.status(StatusCodes.OK).json({ data });
};
// User App related ends ------
