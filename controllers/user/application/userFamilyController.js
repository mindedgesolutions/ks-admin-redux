import { StatusCodes } from "http-status-codes";
import pool from "../../../db.js";
import { BadRequestError } from "../../../errors/customErrors.js";
import { getApplicationId } from "../../../utils/functions.js";

// Family information functions start ------
export const addFamilyMember = async (req, res) => {
  const {
    memberAadhaar,
    memberAge,
    memberEpic,
    memberGender,
    memberName,
    memberRelation,
    memberSchemes,
  } = req.body;
  const { mobile, applicationId } = req.appUser;

  try {
    await pool.query("BEGIN");

    const appId = applicationId || (await getApplicationId(mobile));
    const getMwin = await pool.query(
      `select identification_number from k_migrant_worker_master where id=$1`,
      [appId]
    );
    const mwin = getMwin.rows[0].identification_number;
    const epic = memberEpic ?? null;
    const data = await pool.query(
      `insert into k_migrant_family_info(mwin_no, application_id, member_name, member_gender, member_age, member_aadhar_no, member_relationship, member_epic, flag_web_app) values($1, $2, $3, $4, $5, $6, $7, $8, 'W') returning id`,
      [
        mwin,
        appId,
        memberName,
        memberGender,
        memberAge,
        memberAadhaar,
        memberRelation,
        epic,
      ]
    );
    const memberId = data.rows[0].id;
    if (memberSchemes.length > 0) {
      const values = JSON.parse(memberSchemes)
        .map((scheme) => {
          return `('${appId}', ${memberId}, '${scheme.value}')`;
        })
        .join(", ");

      await pool.query(
        `insert into k_availed_schemes(application_id, member_id, scheme_id) values ${values}`
      );
    }

    await pool.query("COMMIT");

    res.status(StatusCodes.CREATED).json({ data: `success` });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.log(error);
    throw new BadRequestError(error);
  }
};

export const getAllMembers = async (req, res) => {
  const { mobile, applicationId } = req.appUser;
  const searchBy = applicationId || (await getApplicationId(mobile));
  const data = await pool.query(
    `select kmfi.* from k_migrant_family_info kmfi where kmfi.application_id=$1`,
    [searchBy]
  );
  res.status(StatusCodes.OK).json({ data });
};

export const getSingleMember = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("BEGIN");

    const data = await pool.query(
      `select * from k_migrant_family_info where id=$1`,
      [id]
    );
    const meta = await pool.query(
      `select * from k_availed_schemes where member_id=$1`,
      [id]
    );

    await pool.query("COMMIT");

    res.status(StatusCodes.OK).json({ data, meta });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.log(error);
    throw new BadRequestError(`Something went wrong! ${error}`);
  }
};

export const updateSingleMember = async (req, res) => {
  const { appId, id } = req.params;
  const {
    memberAadhaar,
    memberAge,
    memberEpic,
    memberGender,
    memberName,
    memberRelation,
    memberSchemes,
  } = req.body;

  try {
    await pool.query("BEGIN");

    await pool.query(
      `update k_migrant_family_info set member_name=$1, member_gender=$2, member_age=$3, member_aadhar_no=$4, member_relationship=$5, member_epic=$6 where id=$7`,
      [
        memberName,
        memberGender,
        memberAge,
        memberAadhaar,
        memberRelation,
        memberEpic,
        id,
      ]
    );

    await pool.query(
      `delete from k_availed_schemes where application_id=$1 and member_id=$2`,
      [appId, id]
    );

    if (memberSchemes.length > 0) {
      const values = JSON.parse(memberSchemes)
        .map((scheme) => {
          return `('${appId}', ${id}, '${scheme.value}')`;
        })
        .join(", ");

      await pool.query(
        `insert into k_availed_schemes(application_id, member_id, scheme_id) values ${values}`
      );
    }

    await pool.query("COMMIT");

    res.status(StatusCodes.ACCEPTED).json({ data: `success` });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.log(error);
    throw new BadRequestError(`Something went wrong! ${error}`);
  }
};

export const deleteMember = async (req, res) => {
  const { appId, id } = req.params;
  try {
    await pool.query("BEGIN");

    await pool.query(
      `delete from k_availed_schemes where application_id=$1 and member_id=$2`,
      [appId, id]
    );

    await pool.query(`delete from k_migrant_family_info where id=$1`, [id]);
    const count = await pool.query(
      `select count(id) from k_migrant_family_info where application_id=$1`,
      [appId]
    );

    await pool.query("COMMIT");

    res.status(StatusCodes.OK).json({ data: count });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.log(error);
    throw new BadRequestError(`Something went wrong! ${error}`);
  }
};
// Family information functions end ------
