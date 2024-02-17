import pool from "../db.js";
import { UnauthorizedError } from "../errors/customErrors.js";

export const accessWorksite = async (req, res, next) => {
  const { mobile } = req.appUser;
  const data = await pool.query(
    `select id from k_migrant_worker_master where mobile=$1`,
    [mobile]
  );
  if (data.rowCount === 0) throw new UnauthorizedError(`Not authorised`);
  next();
};

export const accessAgency = async (req, res, next) => {
  const { mobile } = req.appUser;
  const data = await pool.query(
    `select kwd.present_country from k_migrant_work_details kwd join k_migrant_worker_master kwm on kwm.id = kwd.application_id where kwm.mobile=$1`,
    [mobile]
  );
  if (data.rowCount === 0) throw new UnauthorizedError(`Not authorised`);
  next();
};

export const accessBank = async (req, res, next) => {
  const { mobile } = req.appUser;
  const data = await pool.query(
    `select kwd.engaged_as from k_migrant_work_details kwd join k_migrant_worker_master kwm on kwm.id = kwd.application_id where kwm.mobile=$1`,
    [mobile]
  );
  if (data.rowCount === 0) throw new UnauthorizedError(`Not authorised`);
  next();
};

export const accessFamily = async (req, res) => {};

export const accessDoc = async (req, res) => {};
