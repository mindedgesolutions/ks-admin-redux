import { StatusCodes } from "http-status-codes";
import pool from "../../../db.js";
import { getApplicationId, updateBankId } from "../../../utils/functions.js";
import { BadRequestError } from "../../../errors/customErrors.js";

// Bank & Nominee information functions start ------
export const addBankInfo = async (req, res) => {
  const { mobile, applicationId } = req.appUser;
  const {
    appId,
    ifscCode,
    bankName,
    branchName,
    accountNo,
    khadyasathiNo,
    sasthyasathiNo,
    schemes,
    nomineeName,
    nomineeRelation,
    nomineeMobile,
    nomineeAadhaar,
  } = req.body;

  try {
    await pool.query("BEGIN");

    const mwin = await pool.query(
      `select identification_number from k_migrant_worker_master where id=$1`,
      [appId]
    );

    // Nominee add ------
    await pool.query(
      `insert into k_migrant_worker_nominees(mwin_no, application_id, nominee_name, nominee_relationship, nominee_mobile, nominee_aadhar, bank_name, bank_branch, bank_account, ifsc_code) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        mwin.rows[0].identification_number,
        appId,
        nomineeName,
        nomineeRelation,
        nomineeMobile,
        nomineeAadhaar,
        bankName,
        branchName,
        accountNo,
        ifscCode,
      ]
    );

    // Khadyasathi / Sasthyasathi no update ------
    await pool.query(
      `update k_migrant_worker_master set khadyasathi_no=$1, sasthyasathi_no=$2 where id=$3`,
      [khadyasathiNo, sasthyasathiNo ?? null, appId]
    );

    // Schemes add ------
    const inputSchemes = JSON.parse(schemes);
    const values = inputSchemes
      .map((data) => {
        return `('${appId}', '${data.value}')`;
      })
      .join(", ");

    const schemeInsert = await pool.query(
      `insert into k_availed_schemes(application_id, scheme_id) values ${values} returning id`
    );

    await pool.query("COMMIT");

    res.status(StatusCodes.OK).json({ msg: `success` });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.log(error);
    throw new BadRequestError(`Something went wrong!`);
  }
};

export const updateBankInfo = async (req, res) => {
  const { mobile, applicationId } = req.appUser;
};

export const getBankInfo = async (req, res) => {
  const { mobile, applicationId } = req.appUser;
  const searchBy = applicationId || (await getApplicationId(mobile));
  const data = await pool.query(
    `select kwn.*, kwm.khadyasathi_no, kwm.sasthyasathi_no from k_migrant_worker_nominees kwn join k_migrant_worker_master kwm on kwn.application_id=kwm.id where kwn.application_id=$1`,
    [searchBy]
  );
  res.status(StatusCodes.OK).json({ data });
};

export const getUserSchemes = async (req, res) => {
  const { mobile, applicationId } = req.appUser;
  const appId = applicationId || (await getApplicationId(mobile));

  const data = await pool.query(
    `select kas.scheme_id, ms.schemes_name from k_availed_schemes as kas join master_schemes as ms on kas.scheme_id=ms.id where kas.application_id=$1 and kas.member_id is null order by ms.schemes_name`,
    [appId]
  );

  res.status(StatusCodes.OK).json({ data });
};

export const updateOldBankId = async (req, res) => {
  try {
    await pool.query("BEGIN");

    const data = await pool.query(
      `select distinct ifsc_code from k_migrant_worker_master where bank_name is not null and ifsc_code is not null`,
      []
    );
    data.rows.map((bank) => {
      return updateBankId(bank.ifsc_code);
    });

    await pool.query("COMMIT");

    res.status(StatusCodes.ACCEPTED).json({ data: `success` });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.log(error);
    throw new BadRequestError(`Something went wrong`);
  }
};

export const addNewBank = async (req, res) => {};

// Bank & Nominee information functions end ------
