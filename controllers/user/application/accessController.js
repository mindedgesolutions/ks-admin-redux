import { StatusCodes } from "http-status-codes";
import pool from "../../../db.js";
import { getApplicationId } from "../../../utils/functions.js";

export const availableAccess = async (req, res) => {
  const { mobile } = req.appUser;
  const applicationId = await getApplicationId(mobile);
  const master = await pool.query(
    `select id from k_migrant_worker_master where is_active=1 and id=$1`,
    [applicationId]
  );
  const work = await pool.query(
    `select present_country, engaged_as from k_migrant_work_details where is_active=1 and application_id=$1`,
    [applicationId]
  );
  const nominee = await pool.query(
    `select id from k_migrant_worker_nominees where is_active=1 and application_id=$1`,
    [applicationId]
  );
  const family = await pool.query(
    `select id from k_migrant_family_info where is_active=1 and application_id=$1`,
    [applicationId]
  );
  const accessPersonal = true;
  const accessWorksite = master.rowCount > 0 ? true : false;
  const accessAgency = work.rows[0]?.present_country ? true : false;
  const accessBank = work.rows[0]?.engaged_as ? true : false;
  const accessFamily = nominee.rowCount > 0 ? true : false;
  const accessDoc = family.rowCount > 0 ? true : false;

  const data = {
    personal: accessPersonal,
    worksite: accessWorksite,
    agency: accessAgency,
    bank: accessBank,
    family: accessFamily,
    doc: accessDoc,
  };

  res.status(StatusCodes.OK).json({ data });
};
