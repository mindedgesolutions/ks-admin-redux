import { StatusCodes } from "http-status-codes";
import pool from "../../../db.js";
import { getApplicationId } from "../../../utils/functions.js";

export const getCurrentApplication = async (req, res) => {
  const { mobile } = req.appUser;
  const data = await pool.query(
    `select * from k_migrant_worker_master where mobile=$1 and is_active=1`,
    [mobile]
  );
  res.status(StatusCodes.OK).json({ data });
};

// Personal information functions start ------
export const addPersonalInfo = async (req, res) => {
  const { mobile } = req.appUser;
  const {
    name,
    fatherHusbandName,
    gender,
    dob,
    age,
    category,
    aadhaar,
    emergencyMobile,
    epic,
    permanentAddress,
    district,
    subDiv,
    blType,
    blCode,
    gpCode,
    pin,
    psCode,
    religion,
    religionOther,
    qualification,
    skillDesc,
  } = req.body;

  const query = `insert into k_migrant_worker_master (mobile, status, name, father_husband_name, gender, dob, age, caste, aadhar_no, emergency_contact_no, epic_no, permanent_address, permanent_dist, permanent_subdivision, permanent_areatype, permanent_areacode, permanent_villward, permanent_pin, permanent_ps, religion, religion_other, qualification, technical_skill, flag_web_app) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, 'W') RETURNING id`;

  const values = [
    mobile,
    `I`,
    name,
    fatherHusbandName,
    gender,
    dob,
    age,
    category,
    aadhaar,
    emergencyMobile,
    epic || null,
    permanentAddress,
    district,
    subDiv,
    blType,
    blCode,
    gpCode,
    pin,
    psCode,
    religion,
    religionOther,
    qualification,
    skillDesc,
  ];
  const data = await pool.query(query, values);
  res
    .status(StatusCodes.CREATED)
    .json({ data: data.rows[0].id, msg: `Data added` });
};

export const getPersonalInfo = async (req, res) => {
  const { mobile, applicationId } = req.appUser;
  const data = await pool.query(
    `select * from k_migrant_worker_master where mobile=$1`,
    [mobile]
  );
  res.status(StatusCodes.OK).json({ data });
};

export const getCompletePersonalInfo = async (req, res) => {
  const { mobile, applicationId } = req.appUser;
  const searchBy = applicationId || (await getApplicationId(mobile));

  const response = await pool.query(
    `select kwm.*, 
    kwd.*, 
    kwn.*, 
    md.district_name, 
    msd.subdiv_name, 
    mbm.block_mun_name,
    mvw.village_ward_name,
    mps.ps_name
    from k_migrant_worker_master kwm 
    join k_migrant_work_details kwd on kwm.id = kwd.application_id 
    join k_migrant_worker_nominees kwn on kwm.id = kwn.application_id 
    join master_district md on kwm.permanent_dist = md.district_code 
    join master_subdivision msd on kwm.permanent_subdivision = msd.subdiv_code 
    join master_block_mun mbm on kwm.permanent_areacode = mbm.block_mun_code 
    join master_village_ward mvw on kwm.permanent_villward = mvw.village_ward_code 
    join master_policestation mps on kwm.permanent_ps = mps.ps_code 
    where kwm.id=$1`,
    [searchBy]
  );
  // ------------
  let religionName;
  if (response.rows[0].religion) {
    const rel = await pool.query(
      `select religion_name from master_religion where id=$1`,
      [Number(response.rows[0].religion)]
    );
    religionName = rel.rows[0].religion_name;
  } else {
    religionName = null;
  }
  // ------------
  const data = {
    response: response,
    religionName: religionName,
  };

  res.status(StatusCodes.OK).json({ data });
};

export const updatePersonalInfo = async (req, res) => {
  const { mobile, applicationId } = req.appUser;
  const {
    name,
    fatherHusbandName,
    gender,
    dob,
    age,
    category,
    aadhaar,
    emergencyMobile,
    epic,
    permanentAddress,
    district,
    subDiv,
    blType,
    blCode,
    gpCode,
    pin,
    psCode,
    religion,
    religionOther,
    qualification,
    skill,
    skillDesc,
  } = req.body;

  const techSkill = skill === "yes" ? skillDesc : null;

  let query = `update k_migrant_worker_master set name=$1, father_husband_name=$2, gender=$3, dob=$4, age=$5, caste=$6, aadhar_no=$7, emergency_contact_no=$8, epic_no=$9, permanent_address=$10, permanent_dist=$11, permanent_subdivision=$12, permanent_areatype=$13, permanent_areacode=$14, permanent_villward=$15, permanent_pin=$16, permanent_ps=$17, religion=$18, religion_other=$19, qualification=$20, technical_skill=$21, modified_date=$22`;
  query = applicationId ? query + ` where id=$23` : query + ` where mobile=$23`;
  const values = [
    name,
    fatherHusbandName,
    gender,
    dob,
    age,
    category,
    aadhaar,
    emergencyMobile,
    epic || null,
    permanentAddress,
    district,
    subDiv,
    blType,
    blCode,
    gpCode,
    pin,
    psCode,
    religion,
    religion === "9" ? religionOther : null,
    qualification,
    techSkill,
    new Date(),
    applicationId || mobile,
  ];
  const data = await pool.query(query, values);
  const appId = await getApplicationId(mobile);

  res.status(StatusCodes.ACCEPTED).json({ data: appId });
};
// Personal information functions end ------
