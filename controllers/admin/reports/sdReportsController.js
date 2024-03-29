import * as dotenv from "dotenv";
dotenv.config();
import pool from "../../../db.js";
import { StatusCodes } from "http-status-codes";
import { formatEndDate, formatStartDate } from "../../../utils/functions.js";

// SD Digitised report starts ------ >>

// SD Digitised report (WITH FILTERS) starts ------
export const sdTotalDigitised = async (req, res) => {
  const { dist, subdiv, block, startDate, endDate } = req.query;

  const start = formatStartDate(startDate);
  const end = formatEndDate(endDate);

  let data;

  if (dist === process.env.ALL_DISTRICTS_CODE) {
    data = await pool.query(
      `SELECT dm.district_name,
      dm.district_code,
      c.digitised
      FROM master_district dm
      LEFT JOIN (
        SELECT count(k_migrant_worker_master.id) AS digitised, k_migrant_worker_master.permanent_dist FROM k_migrant_worker_master WHERE k_migrant_worker_master.is_active = 1 AND k_migrant_worker_master.status!='I' AND k_migrant_worker_master.status IS NOT NULL AND k_migrant_worker_master.created_date BETWEEN $1 AND $2 GROUP BY k_migrant_worker_master.permanent_dist) as c ON c.permanent_dist = dm.district_code 
      WHERE dm.is_active = 1 and dm.state_code=1 ORDER BY dm.district_code, dm.district_name`,
      [start, end]
    );
  } else {
    if (dist && !subdiv) {
      data = await pool.query(
        `SELECT sm.district_name,
        sm.district_code,
        sm.subdiv_code,
        sm.subdiv_name,
        c.digitised
        FROM master_subdivision sm
        LEFT JOIN (
          SELECT count(k_migrant_worker_master.id) AS digitised, k_migrant_worker_master.permanent_subdivision FROM k_migrant_worker_master WHERE k_migrant_worker_master.is_active = 1 AND k_migrant_worker_master.status!='I' AND k_migrant_worker_master.status IS NOT NULL AND k_migrant_worker_master.created_date BETWEEN $1 AND $2 GROUP BY k_migrant_worker_master.permanent_subdivision) as c ON c.permanent_subdivision = sm.subdiv_code 
        WHERE sm.is_active = 1 and sm.district_code=$3 ORDER BY sm.district_code, sm.district_name, sm.subdiv_code, sm.subdiv_name`,
        [start, end, Number(dist)]
      );
    } else if (subdiv && !block) {
      data = await pool.query(
        `SELECT sm.subdiv_name,
        bm.block_mun_code,
        bm.block_mun_name,
        c.digitised
        FROM master_block_mun bm
        JOIN master_subdivision sm ON sm.subdiv_code=bm.subdiv_code
        LEFT JOIN (
          SELECT count(k_migrant_worker_master.id) AS digitised, k_migrant_worker_master.permanent_areacode FROM k_migrant_worker_master WHERE k_migrant_worker_master.is_active = 1 AND k_migrant_worker_master.status!='I' AND k_migrant_worker_master.status IS NOT NULL AND k_migrant_worker_master.created_date BETWEEN $1 AND $2 GROUP BY k_migrant_worker_master.permanent_areacode) as c ON c.permanent_areacode = bm.block_mun_code 
        WHERE bm.is_active = 1 and bm.subdiv_code=$3 ORDER BY sm.subdiv_name, bm.block_mun_code, bm.block_mun_name`,
        [start, end, Number(subdiv)]
      );
    } else if (block) {
      data = await pool.query(
        `select vm.village_ward_name,
        vm.village_ward_code,
        vm.block_mun_code,
        bm.block_mun_name,
        c.digitised
        from master_village_ward as vm
        join master_block_mun as bm on bm.block_mun_code=vm.block_mun_code
        LEFT JOIN (
          SELECT count(k_migrant_worker_master.id) AS digitised, k_migrant_worker_master.permanent_villward FROM k_migrant_worker_master WHERE k_migrant_worker_master.is_active = 1 AND k_migrant_worker_master.status!='I' AND k_migrant_worker_master.status IS NOT NULL AND k_migrant_worker_master.created_date BETWEEN $1 AND $2 GROUP BY k_migrant_worker_master.permanent_villward) as c ON c.permanent_villward = vm.village_ward_code 
        WHERE vm.is_active = 1 and vm.block_mun_code=$3 ORDER BY bm.block_mun_name, vm.village_ward_code, vm.village_ward_name`,
        [start, end, Number(block)]
      );
    }
  }

  res.status(StatusCodes.OK).json({ data });
};
// SD Digitised report (WITH FILTERS) ends ------

// SD Digitised report (ALL 480 WARDS) starts ------
export const sdTotalDigitisedAll = async (req, res) => {
  const { startDate, endDate } = req.query;

  const start = formatStartDate(startDate);
  const end = formatEndDate(endDate);

  const data = await pool.query(
    `select sm.subdiv_name,
    bm.block_mun_code,
    bm.block_mun_name,
    c.digitised
    from master_block_mun as bm
    join master_subdivision as sm on sm.subdiv_code=bm.subdiv_code
    LEFT JOIN (
      SELECT count(k_migrant_worker_master.id) AS digitised, k_migrant_worker_master.permanent_areacode FROM k_migrant_worker_master WHERE k_migrant_worker_master.is_active = 1 AND k_migrant_worker_master.status!='I' AND k_migrant_worker_master.status IS NOT NULL AND k_migrant_worker_master.created_date BETWEEN $1 AND $2 GROUP BY k_migrant_worker_master.permanent_areacode) as c ON c.permanent_areacode = bm.block_mun_code 
    WHERE bm.is_active = 1 ORDER BY sm.subdiv_name, bm.block_mun_code, bm.block_mun_name`,
    [start, end]
  );

  res.status(StatusCodes.OK).json({ data });
};
// SD Digitised report (ALL 480 WARDS) ends ------

export const sdDeoCount = async (req, res) => {
  const { dist, subdiv, block } = req.query;

  let data;
  if (dist === process.env.ALL_DISTRICTS_CODE) {
    data = await pool.query(
      `SELECT dm.district_name,
      dm.district_code,
      deo.deocount
      from master_district dm
      LEFT JOIN (
        SELECT count(dui.id) AS deocount, dui.allotted_district FROM k_duaresarkar_user_info dui GROUP BY dui.allotted_district
      ) AS deo ON deo.allotted_district = dm.district_code
      WHERE dm.is_active=$1 AND dm.state_code=1 ORDER BY dm.district_name`,
      [1]
    );
  }
};

export const sdDeoList = async (req, res) => {};

export const sdDeoEntries = async (req, res) => {};

export const sdDeoApplications = async (req, res) => {};
