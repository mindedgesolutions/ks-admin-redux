import * as dotenv from "dotenv";
dotenv.config();
import pool from "../../../db.js";
import { StatusCodes } from "http-status-codes";
import { formatEndDate, formatStartDate } from "../../../utils/functions.js";

export const bskApplicationStatusReport = async (req, res) => {
  const { dist, subdiv, block, startDate, endDate } = req.query;

  const start = formatStartDate(startDate);
  const end = formatEndDate(endDate);

  let data;
  if (dist === process.env.ALL_DISTRICTS_CODE) {
    data = await pool.query(
      `SELECT dm.district_name,
      dm.district_code,
      wmp.provisional,
      wmd.docuploaded,
      wmu.underprocess,
      wmr.rejected,
      wms.permanent
      FROM master_district dm
      LEFT JOIN (
        SELECT count(krm.id) AS provisional, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('P') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_dist
      ) AS wmp ON wmp.permanent_dist = dm.district_code
      LEFT JOIN (
        SELECT count(krm.id) AS docuploaded, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('A', 'BA') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_dist
      ) AS wmd ON wmd.permanent_dist = dm.district_code
      LEFT JOIN (
        SELECT count(krm.id) AS underprocess, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('B', 'BP', 'BI') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_dist
      ) AS wmu ON wmu.permanent_dist = dm.district_code
      LEFT JOIN (
        SELECT count(krm.id) AS rejected, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('R') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_dist
      ) AS wmr ON wmr.permanent_dist = dm.district_code
      LEFT JOIN (
        SELECT count(krm.id) AS permanent, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('C') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_dist
      ) AS wms ON wms.permanent_dist = dm.district_code
      where dm.is_active=$1 AND dm.state_code=1 ORDER BY dm.district_name`,
      [1, start, end]
    );
  } else {
    // For SELECTED District starts ------
    if (dist && !subdiv) {
      data = await pool.query(
        `SELECT sm.district_name,
        sm.subdiv_code,
        sm.subdiv_name,
        wmp.provisional,
        wmd.docuploaded,
        wmu.underprocess,
        wmr.rejected,
        wms.permanent
        FROM master_subdivision sm
        LEFT JOIN (
          SELECT count(krm.id) AS provisional, kwm.permanent_subdivision FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id=krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('P') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 AND kwm.flag='BSK' GROUP BY kwm.permanent_subdivision
        ) AS wmp ON wmp.permanent_subdivision = sm.subdiv_code
        LEFT JOIN (
          SELECT count(krm.id) AS docuploaded, kwm.permanent_subdivision FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('A', 'BA') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_subdivision
        ) AS wmd ON wmd.permanent_subdivision = sm.subdiv_code
        LEFT JOIN (
          SELECT count(krm.id) AS underprocess, kwm.permanent_subdivision FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('B', 'BP', 'BI') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_subdivision
        ) AS wmu ON wmu.permanent_subdivision = sm.subdiv_code
        LEFT JOIN (
          SELECT count(krm.id) AS rejected, kwm.permanent_subdivision FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('R') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_subdivision
        ) AS wmr ON wmr.permanent_subdivision = sm.subdiv_code
        LEFT JOIN (
          SELECT count(krm.id) AS permanent, kwm.permanent_subdivision FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('C') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_subdivision
        ) AS wms ON wms.permanent_subdivision = sm.subdiv_code
        WHERE sm.is_active=$1 AND sm.district_code=$4 ORDER BY sm.subdiv_name`,
        [1, start, end, Number(dist)]
      );
      // For SELECTED District ends ------
    } else if (subdiv && !block) {
      // For SELECTED Sub-Division starts ------
      data = await pool.query(
        `SELECT sm.subdiv_name,
        bm.block_mun_code,
        bm.block_mun_name,
        wmp.provisional,
        wmd.docuploaded,
        wmu.underprocess,
        wmr.rejected,
        wms.permanent
        FROM master_block_mun bm
        JOIN master_subdivision sm ON sm.subdiv_code=bm.subdiv_code
        left join (
          SELECT count(krm.id) AS provisional, kwm.permanent_areacode FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id=krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('P') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 AND kwm.flag='BSK' GROUP BY kwm.permanent_areacode
        ) AS wmp ON wmp.permanent_areacode = bm.block_mun_code
        left join (
          SELECT count(krm.id) AS docuploaded, kwm.permanent_areacode FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('A', 'BA') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_areacode
        ) AS wmd ON wmd.permanent_areacode = bm.block_mun_code
        left join (
          SELECT count(krm.id) AS underprocess, kwm.permanent_areacode FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('B', 'BP', 'BI') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_areacode
        ) AS wmu ON wmu.permanent_areacode = bm.block_mun_code
        left join (
          SELECT count(krm.id) AS rejected, kwm.permanent_areacode FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('R') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_areacode
        ) AS wmr ON wmr.permanent_areacode = bm.block_mun_code
        left join (
          SELECT count(krm.id) AS permanent, kwm.permanent_areacode FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('C') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_areacode
        ) AS wms ON wms.permanent_areacode = bm.block_mun_code
        where sm.is_active=$1 and bm.subdiv_code=$4 order by bm.block_mun_name`,
        [1, start, end, Number(subdiv)]
      );
      // For SELECTED Sub-Division ends ------
    } else if (block) {
      // For SELECTED Block starts ------
      data = await pool.query(
        `select vm.village_ward_name,
        vm.village_ward_code,
        vm.block_mun_code,
        bm.block_mun_name,
        wmp.provisional,
        wmd.docuploaded,
        wmu.underprocess,
        wmr.rejected,
        wms.permanent
        from master_village_ward as vm
        join master_block_mun as bm on bm.block_mun_code=vm.block_mun_code
        left join (
          SELECT count(krm.id) AS provisional, kwm.permanent_villward FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id=krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('P') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 AND kwm.flag='BSK' GROUP BY kwm.permanent_villward
        ) as wmp on wmp.permanent_villward = vm.village_ward_code
        left join (
          SELECT count(krm.id) AS docuploaded, kwm.permanent_villward FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('A', 'BA') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_villward
        ) as wmd on wmd.permanent_villward = vm.village_ward_code
        left join (
          SELECT count(krm.id) AS underprocess, kwm.permanent_villward FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('B', 'BP', 'BI') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_villward
        ) as wmu on wmu.permanent_villward = vm.village_ward_code
        left join (
          SELECT count(krm.id) AS rejected, kwm.permanent_villward FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('R') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_villward
        ) as wmr on wmr.permanent_villward = vm.village_ward_code
        left join (
          SELECT count(krm.id) AS permanent, kwm.permanent_villward FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('C') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_villward
        ) as wms on wms.permanent_villward = vm.village_ward_code
        where vm.is_active=$1 and vm.block_mun_code=$4 order by vm.village_ward_name`,
        [1, start, end, Number(block)]
      );
      // For SELECTED Block ends ------
    }
  }

  res.status(StatusCodes.OK).json({ data });
};

export const bskApplicationStatusReportAll = async (req, res) => {
  const { startDate, endDate } = req.query;

  const start = formatStartDate(startDate);
  const end = formatEndDate(endDate);

  const data = await pool.query(
    `select sm.subdiv_name,
    bm.block_mun_code,
    bm.block_mun_name,
    wmp.provisional,
    wmd.docuploaded,
    wmu.underprocess,
    wmr.rejected,
    wms.permanent
    from master_block_mun as bm
    join master_subdivision as sm on sm.subdiv_code=bm.subdiv_code
    left join (
      SELECT count(krm.id) AS provisional, kwm.permanent_areacode FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id=krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('P') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 AND kwm.flag='BSK' GROUP BY kwm.permanent_areacode
    ) as wmp on wmp.permanent_areacode = bm.block_mun_code
    left join (
      SELECT count(krm.id) AS docuploaded, kwm.permanent_areacode FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('A', 'BA') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_areacode
    ) as wmd on wmd.permanent_areacode = bm.block_mun_code
    left join (
      SELECT count(krm.id) AS underprocess, kwm.permanent_areacode FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('B', 'BP', 'BI') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_areacode
    ) as wmu on wmu.permanent_areacode = bm.block_mun_code
    left join (
      SELECT count(krm.id) AS rejected, kwm.permanent_areacode FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('R') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_areacode
    ) as wmr on wmr.permanent_areacode = bm.block_mun_code
    left join (
      SELECT count(krm.id) AS permanent, kwm.permanent_areacode FROM k_migrant_worker_master kwm JOIN k_migrant_worker_remark_master krm ON kwm.id = krm.application_id WHERE krm.status IS NOT NULL and krm.status in ('C') AND krm.remark_date_l BETWEEN $2 AND $3 AND krm.is_active=$1 and kwm.flag='BSK' GROUP BY kwm.permanent_areacode
    ) as wms on wms.permanent_areacode = bm.block_mun_code
    where sm.is_active=$1 and bm.is_active=$1 order by bm.block_mun_name`,
    [1, start, end, dbFlag]
  );
  res.status(StatusCodes.OK).json({ data });
};
