import { StatusCodes } from "http-status-codes";
import pool from "../../../db.js";
import { getApplicationId } from "../../../utils/functions.js";
import { BadRequestError } from "../../../errors/customErrors.js";

// Worksite information functions start (C, R, U) ------
export const addWorksiteInfo = async (req, res) => {
  const { mobile, applicationId } = req.appUser;
  const {
    appId,
    workAddress,
    country,
    stateCode,
    countryName,
    passportNo,
    workPs,
    empNature,
    migDate,
    expectedWages,
  } = req.body;

  let inputCountryName;
  switch (country) {
    case "1":
      inputCountryName = `India`;
      break;
    case "3":
      inputCountryName = `Nepal`;
      break;
    case "4":
      inputCountryName = `Bhutan`;
      break;
    case "2":
      inputCountryName = countryName;
      break;
  }

  const text = `insert into k_migrant_work_details (application_id, present_country, present_country_name, passport_no, present_state, present_address, present_ps, nature_of_work_id, migrated_from_date, expected_salary) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
  const values = [
    appId,
    country,
    inputCountryName,
    passportNo || null,
    stateCode || null,
    workAddress,
    workPs,
    empNature,
    migDate,
    expectedWages || 0,
  ];
  const data = await pool.query(text, values);
  res.status(StatusCodes.CREATED).json({ msg: `success` });
};

export const getWorksiteInfo = async (req, res) => {
  const { mobile, applicationId } = req.appUser;
  const searchBy = applicationId || (await getApplicationId(mobile));
  const data = await pool.query(
    `select application_id, present_country, present_country_name, present_address, passport_no, present_state, present_ps, nature_of_work_id, migrated_from_date, expected_salary from k_migrant_work_details where application_id=$1`,
    [searchBy]
  );
  res.status(StatusCodes.OK).json({ data });
};

export const updateWorksiteInfo = async (req, res) => {
  const { mobile, applicationId } = req.appUser;
  const {
    appId,
    workAddress,
    country,
    stateCode,
    countryName,
    passportNo,
    workPs,
    empNature,
    migDate,
    expectedWages,
  } = req.body;

  let inputCountryName;
  switch (country) {
    case "1":
      inputCountryName = `India`;
      break;
    case "3":
      inputCountryName = `Nepal`;
      break;
    case "4":
      inputCountryName = `Bhutan`;
      break;
    case "2":
      inputCountryName = countryName;
      break;
  }

  const text = `update k_migrant_work_details set present_country=$1, present_country_name=$2, passport_no=$3, present_state=$4, present_address=$5, present_ps=$6, nature_of_work_id=$7, migrated_from_date=$8, expected_salary=$9 where application_id=$10`;
  const values = [
    country,
    inputCountryName,
    country !== "1" ? passportNo : null,
    country === "1" ? stateCode : null,
    workAddress,
    workPs,
    empNature,
    migDate,
    expectedWages || 0,
    appId,
  ];
  const data = await pool.query(text, values);
  res.status(StatusCodes.ACCEPTED).json({ msg: `success` });
};
// Worksite information functions end (C, R, U) ------

// Agency information functions start (R, U) ------
export const getAgencyInfo = async (req, res) => {
  const { mobile, applicationId } = req.appUser;
  const searchBy = applicationId || (await getApplicationId(mobile));
  const data = await pool.query(
    `select engaged_as, agency_name, agency_address, agency_mobile, employer_name, employer_address, employer_mobile from k_migrant_work_details where application_id=$1`,
    [searchBy]
  );
  res.status(StatusCodes.OK).json({ data });
};

export const updateAgencyInfo = async (req, res) => {
  const { mobile, applicationId } = req.appUser;
  const {
    appId,
    empType,
    empName,
    empAddress,
    empMobile,
    agentName,
    agentAddress,
    agentMobile,
    companyName,
    companyAddress,
    companyMobile,
  } = req.body;

  let eName, eAddress, eMobile, aName, aAddress, aMobile;

  if (empType === "Agency") {
    eName = empName || null;
    eAddress = empAddress || null;
    eMobile = Number(empMobile) || null;
    aName = agentName;
    aAddress = agentAddress;
    aMobile = Number(agentMobile);
  } else if (empType === "Without-agency") {
    eName = companyName || null;
    eAddress = companyAddress || null;
    eMobile = companyMobile || null;
    aName = null;
    aAddress = null;
    aMobile = null;
  } else if (empType === "Self-employed") {
    eName = null;
    eAddress = null;
    eMobile = null;
    aName = null;
    aAddress = null;
    aMobile = null;
  }

  try {
    await pool.query("BEGIN");

    // Work details update ------
    const data = await pool.query(
      `update k_migrant_work_details set engaged_as=$1, employer_name=$2, employer_address=$3, employer_mobile=$4, agency_name=$5, agency_address=$6, agency_mobile=$7 where application_id=$8`,
      [empType, eName, eAddress, eMobile, aName, aAddress, aMobile, appId]
    );

    // Master update ------
    const mwin = `MW${new Date().getFullYear()}${appId}`;
    await pool.query(
      `update k_migrant_worker_master set identification_number=$1, status='P' where id=$2`,
      [mwin, appId]
    );

    // Remark insert ------
    await pool.query(
      `insert into k_migrant_worker_remark_master(application_id, mwin_no, status, remark, flag_web_app, is_active) values($1, $2, $3, $4, $5, $6)`,
      [appId, mwin, "P", process.env.APP_STATUS_P, "W", 1]
    );

    await pool.query("COMMIT");

    const response = {
      mwin: mwin,
      createdDate: new Date(),
      mobile: mobile,
    };

    res.status(StatusCodes.OK).json({ response });
  } catch (error) {
    await pool.query("ROLLBACK");
    throw new BadRequestError(`Data not saved! Please try again.`);
  }
};
// Agency information functions end (R, U) ------
