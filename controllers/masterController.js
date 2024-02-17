import { StatusCodes } from "http-status-codes";
import pool from "../db.js";

export const getDistricts = async (req, res) => {
  const text = `select district_code, district_name from master_district where state_code=$1 order by district_name`;
  const values = [1];
  const data = await pool.query(text, values);
  res.status(StatusCodes.OK).json({ data });
};

export const getSubDivisions = async (req, res) => {
  const text = `select subdiv_code, subdiv_name from master_subdivision where district_code=$1 order by subdiv_name`;
  const values = [req.params.district];
  const data = await pool.query(text, values);
  res.status(StatusCodes.OK).json({ data });
};

export const getBlocks = async (req, res) => {
  const text = `select block_mun_code, block_mun_name from master_block_mun where subdiv_code=$1 and type=$2 and is_active=$3 order by block_mun_name`;
  const values = [req.params.subDivCode, req.params.blType, 1];
  const data = await pool.query(text, values);
  res.status(StatusCodes.OK).json({ data });
};

export const getWards = async (req, res) => {
  const text = `select village_ward_code, village_ward_name from master_village_ward where block_mun_code=$1 and is_active=$2 order by village_ward_name`;
  const values = [req.params.blockCode, 1];
  const data = await pool.query(text, values);
  res.status(StatusCodes.OK).json({ data });
};

export const getPs = async (req, res) => {
  const text = `select ps_code, ps_name from master_policestation where district_code=$1 and is_active=$2 order by ps_name`;
  const values = [req.params.district, 1];
  const data = await pool.query(text, values);
  res.status(StatusCodes.OK).json({ data });
};

export const getStates = async (req, res) => {
  const data = await pool.query(
    `select id, statename from master_state where is_active=1 order by statename`,
    []
  );
  res.status(StatusCodes.OK).json({ data });
};

export const getBanks = async (req, res) => {
  const data = await pool.query(
    `select ifsc_code, bank_name, branch_name from bank_branch_master order by ifsc_code`,
    []
  );
  res.status(StatusCodes.OK).json({ data });
};

export const getBankSingle = async (req, res) => {
  const { ifsc } = req.params;
  const data = await pool.query(
    `select bank_name, branch_name from bank_branch_master where ifsc_code=$1`,
    [ifsc]
  );
  res.status(StatusCodes.OK).json({ data });
};

export const getSchemes = async (req, res) => {
  const data = await pool.query(
    `select * from master_schemes where is_active=1 order by schemes_name`,
    []
  );
  res.status(StatusCodes.OK).json({ data });
};

export const getDistrictName = async (req, res) => {
  const text = `select district_name from master_district where district_code=$1`;
  const values = [req.params.id];
  const data = await pool.query(text, values);
  res.status(StatusCodes.OK).json({ data });
};
