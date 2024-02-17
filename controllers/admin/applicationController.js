import * as dotenv from "dotenv";
dotenv.config();
import pool from "../../db.js";
import { StatusCodes } from "http-status-codes";
import { paginationLogic } from "../../utils/pagination.js";
import { BadRequestError } from "../../errors/customErrors.js";
import { dbStatus } from "../../utils/functions.js";

export const getAllApplications = async (req, res) => {
  const { status, mwin, name, mobile, page, limit } = req.query;

  if (
    status &&
    status !== "all" &&
    status !== "approved" &&
    status !== "pending" &&
    status !== "provisional" &&
    status !== "correction" &&
    status !== "rejected"
  )
    throw new BadRequestError(`Invalid URL`);

  let statusArray = [];
  if (status === "all") {
    statusArray = [];
  } else {
    statusArray = dbStatus(status) || ["C"];
  }

  const statusArrayLength = statusArray.length;

  const pagination = paginationLogic(page, limit);
  let index = 0;
  const values = [];

  let text = `select map.*, dm.district_name, sm.subdiv_name, bm.block_mun_name, vm.village_ward_name from k_migrant_worker_master as map`;
  text =
    text +
    ` inner join master_district as dm on map.permanent_dist=dm.district_code`;
  text =
    text +
    ` inner join master_subdivision as sm on map.permanent_subdivision=sm.subdiv_code`;
  text =
    text +
    ` inner join master_block_mun as bm on map.permanent_areacode=bm.block_mun_code`;
  text =
    text +
    ` inner join master_village_ward as vm on map.permanent_villward=vm.village_ward_code`;
  text = text + ` where map.identification_number is not null`;

  if (status === "all") {
    index = index + 1;
    text =
      text + ` and map.status is not null and map.status not in ($${index})`;
    values.push("I");
  } else {
    if (statusArrayLength === 1) {
      index = index + 1;
      text = text + ` and map.status is not null and map.status in ($${index})`;
      values.push(statusArray[0]);
    } else {
      let allIndex = "";
      statusArray.map((item) => {
        index++;
        allIndex = allIndex + `$${index},`;
        values.push(item);
      });
      allIndex = allIndex.slice(0, -1);
      text =
        text + ` and map.status is not null and map.status in (${allIndex})`;
    }
  }

  if (mwin) {
    index = index + 1;
    text = text + ` and map.identification_number like '%' || $${index} || '%'`;
    values.push(mwin);
  }
  if (name) {
    index = index + 1;
    text = text + ` and map.name like '%' || $${index} || '%'`;
    values.push(name);
  }
  if (mobile) {
    index = index + 1;
    text = text + ` and map.mobile=$${index}`;
    values.push(mobile);
  }
  text =
    text + ` order by map.id desc offset $${index + 1} limit $${index + 2}`;

  values.push(Number(pagination.offset), Number(pagination.pageLimit));
  const data = await pool.query(text, values);

  // Row count with / without filters ---
  let textRows = `select count(id) from k_migrant_worker_master where identification_number is not null`;
  let indexRows = 0;
  const valueRows = [];

  if (status === "all") {
    text =
      text + ` and status is not null and status not in ($${indexRows + 3})`;
  } else {
    if (statusArrayLength === 1) {
      indexRows = indexRows + 1;
      textRows =
        textRows + ` and status is not null and status in ($${indexRows})`;
      valueRows.push(statusArray[0]);
    } else {
      let allIndexRows = "";
      statusArray.map((item) => {
        indexRows++;
        allIndexRows = allIndexRows + `$${indexRows},`;
        valueRows.push(item);
      });
      allIndexRows = allIndexRows.slice(0, -1);
      textRows =
        textRows + ` and status is not null and status in (${allIndexRows})`;
    }
  }

  if (mwin) {
    indexRows = indexRows + 1;
    textRows =
      textRows + ` and identification_number like '%' || $${indexRows} || '%'`;
    valueRows.push(mwin);
  }
  if (name) {
    indexRows = indexRows + 1;
    textRows = textRows + ` and name like '%' || $${indexRows} || '%'`;
    valueRows.push(name);
  }
  if (mobile) {
    indexRows = indexRows + 1;
    textRows = textRows + ` and mobile=$${indexRows}`;
    valueRows.push(mobile);
  }

  const totalRows = await pool.query(textRows, valueRows);
  const totalPages = Math.ceil(totalRows.rows[0].count / pagination.pageLimit);
  // const totalPages = Math.ceil(112 / pagination.pageLimit);
  const meta = {
    totalPages: totalPages,
    currentPage: pagination.pageNo,
  };

  res.status(StatusCodes.OK).json({ data, totalRows, meta });
};

export const workerMasterInfo = async (req, res) => {
  const { id } = req.params;
  const data = await pool.query(
    `select * from k_migrant_worker_master where id=$1`,
    [id]
  );
  if (data.rowCount === 0) throw new BadRequestError(`Record doesn't exist`);

  const documents = await pool.query(
    `select * from k_migrant_worker_documents where application_id=$1`,
    [id]
  );

  res.status(StatusCodes.OK).json({ data, documents });
};
