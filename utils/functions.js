import * as dotenv from "dotenv";
dotenv.config();
import dayjs from "dayjs";
import pool from "../db.js";

export const dbStatus = (value) => {
  let label;
  switch (value) {
    case "provisional":
      label = ["P"];
      break;
    case "pending":
      label = ["A", "BA"];
      break;
    case "approved":
      label = "C";
      break;
    case "correction":
      label = ["B", "BP"];
      break;
    case "initiated":
      label = ["I", "BI"];
      break;
    case "rejected":
      label = ["R"];
      break;
  }
  return label;
};

export const formatStartDate = (date) => {
  const startArray = date.split("-");
  const filterStart = dayjs(
    `${startArray[2]}-${startArray[1]}-${startArray[0]}`,
    "Asia/Kolkata"
  ).format(`YYYY-MM-DD ${process.env.REPORT_START_TIME}`);

  return filterStart;
};

export const formatEndDate = (date) => {
  const endArray = date.split("-");
  const filterEnd = dayjs(
    `${endArray[2]}-${endArray[1]}-${endArray[0]}`,
    "Asia/Kolkata"
  ).format(`YYYY-MM-DD ${process.env.REPORT_END_TIME}`);

  return filterEnd;
};

export const getApplicationId = async (mobile) => {
  const data = await pool.query(
    `select id from k_migrant_worker_master where mobile=$1`,
    [Number(mobile)]
  );
  const dbid = data.rowCount > 0 ? data.rows[0].id : null;
  return dbid;
};

export const updateBankId = async (ifsc) => {
  const bankId = await pool.query(
    `select id from bank_branch_master where ifsc_code=$1`,
    [ifsc]
  );
  const dbBankId = bankId.rowCount > 0 ? bankId.rows[0].id : null;
  if (dbBankId) {
    await pool.query(
      `update k_migrant_worker_master set bank_id=$1 where ifsc_code=$2`,
      [dbBankId, ifsc]
    );
  }
};
