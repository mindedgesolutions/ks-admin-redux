import * as dotenv from "dotenv";
dotenv.config();
import pool from "../../../db.js";
import { StatusCodes } from "http-status-codes";
import { formatEndDate, formatStartDate } from "../../../utils/functions.js";
import {
  migAllDist,
  migBlock,
  migDist,
  migSubdiv,
  migWard,
} from "../../../models/admin/dsMigStatusModel.js";

// Duare Sarkar (DS) Application report starts ---
export const dsApplicationStatusReport = async (req, res) => {
  const { dist, subdiv, block, ward, startDate, endDate } = req.query;

  const start = formatStartDate(startDate);
  const end = formatEndDate(endDate);

  let data;
  // For ALL Districts starts ------
  if (dist === process.env.ALL_DISTRICTS_CODE) {
    data = await pool.query(
      `SELECT dm.district_name,
      dm.district_code,
      wmp.provisional,
      wmd.docuploaded,
      wmu.underprocess,
      wmr.rejected,
      wms.permanent
      FROM master_district AS dm
      LEFT JOIN (
        SELECT count(kwm.id) AS provisional, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($5) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 GROUP BY kwm.permanent_dist
      ) AS wmp ON wmp.permanent_dist = dm.district_code
      LEFT JOIN (
        SELECT count(kwm.id) AS docuploaded, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($6, $7) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 GROUP BY kwm.permanent_dist
      ) AS wmd ON wmd.permanent_dist = dm.district_code
      LEFT JOIN (
        SELECT count(kwm.id) AS underprocess, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($8, $9, $10) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 GROUP BY kwm.permanent_dist
      ) AS wmu ON wmu.permanent_dist = dm.district_code
      LEFT JOIN (
        SELECT count(kwm.id) AS rejected, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($11) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 GROUP BY kwm.permanent_dist
      ) AS wmr ON wmr.permanent_dist = dm.district_code
      LEFT JOIN (
        SELECT count(kwm.id) AS permanent, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($12) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 GROUP BY kwm.permanent_dist
      ) AS wms ON wms.permanent_dist = dm.district_code

      WHERE dm.is_active=$1 AND dm.state_code=1 ORDER BY dm.district_name`,
      [
        1,
        start,
        end,
        "Y",
        "P" /*5*/,
        "A",
        "BA" /*6,7*/,
        "B",
        "BP",
        "BI" /*8,9,10*/,
        "R" /*11*/,
        "C" /*12*/,
        "DS-SEP2023" /*13*/,
      ]
    );
    // For ALL Districts ends ------
  } else {
    // For SELECTED District starts ------
    if (dist && !subdiv) {
      data = await pool.query(
        `select sm.district_name,
        sm.subdiv_code,
        sm.subdiv_name,
        wmp.provisional,
        wmd.docuploaded,
        wmu.underprocess,
        wmr.rejected,
        wms.permanent
        from master_subdivision as sm
        left JOIN (
          select count(kwm.id) as provisional, kwm.permanent_subdivision from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($5) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 group by kwm.permanent_subdivision
        ) as wmp on wmp.permanent_subdivision = sm.subdiv_code
        left join (
          select count(kwm.id) as docuploaded, kwm.permanent_subdivision from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($6, $7) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 group by kwm.permanent_subdivision
        ) as wmd on wmd.permanent_subdivision = sm.subdiv_code
        left join (
          select count(kwm.id) as underprocess, kwm.permanent_subdivision from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($8, $9, $10) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 group by kwm.permanent_subdivision
        ) as wmu on wmu.permanent_subdivision = sm.subdiv_code
        left join (
          select count(kwm.id) as rejected, kwm.permanent_subdivision from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($11) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 group by kwm.permanent_subdivision
        ) as wmr on wmr.permanent_subdivision = sm.subdiv_code
        left join (
          select count(kwm.id) as permanent, kwm.permanent_subdivision from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($12) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 group by kwm.permanent_subdivision
        ) as wms on wms.permanent_subdivision = sm.subdiv_code
        where sm.is_active=$1 and sm.district_code=$14 order by sm.subdiv_name`,
        [
          1,
          start,
          end,
          "Y",
          "P" /*5*/,
          "A",
          "BA" /*6,7*/,
          "B",
          "BP",
          "BI" /*8,9,10*/,
          "R" /*11*/,
          "C" /*12*/,
          "DS-SEP2023" /*13*/,
          Number(dist),
        ]
      );
      // For SELECTED District ends ------
    } else if (subdiv && !block) {
      // For SELECTED Sub-Division starts ------
      data = await pool.query(
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
          select count(kwm.id) as provisional, kwm.permanent_areacode from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($5) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 group by kwm.permanent_areacode
        ) as wmp on wmp.permanent_areacode = bm.block_mun_code
        left join (
          select count(kwm.id) as docuploaded, kwm.permanent_areacode from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($6, $7) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 group by kwm.permanent_areacode
        ) as wmd on wmd.permanent_areacode = bm.block_mun_code
        left join (
          select count(kwm.id) as underprocess, kwm.permanent_areacode from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($8, $9, $10) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 group by kwm.permanent_areacode
        ) as wmu on wmu.permanent_areacode = bm.block_mun_code
        left join (
          select count(kwm.id) as rejected, kwm.permanent_areacode from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($11) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 group by kwm.permanent_areacode
        ) as wmr on wmr.permanent_areacode = bm.block_mun_code
        left join (
          select count(kwm.id) as permanent, kwm.permanent_areacode from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($12) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 group by kwm.permanent_areacode
        ) as wms on wms.permanent_areacode = bm.block_mun_code
        where sm.is_active=$1 and bm.subdiv_code=$14 order by bm.block_mun_name`,
        [
          1,
          start,
          end,
          "Y",
          "P" /*5*/,
          "A",
          "BA" /*6,7*/,
          "B",
          "BP",
          "BI" /*8,9,10*/,
          "R" /*11*/,
          "C" /*12*/,
          "DS-SEP2023" /*13*/,
          Number(subdiv),
        ]
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
          select count(kwm.id) as provisional, kwm.permanent_villward from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($5) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 group by kwm.permanent_villward
        ) as wmp on wmp.permanent_villward = vm.village_ward_code
        left join (
          select count(kwm.id) as docuploaded, kwm.permanent_villward from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($6, $7) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 group by kwm.permanent_villward
        ) as wmd on wmd.permanent_villward = vm.village_ward_code
        left join (
          select count(kwm.id) as underprocess, kwm.permanent_villward from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($8, $9, $10) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 group by kwm.permanent_villward
        ) as wmu on wmu.permanent_villward = vm.village_ward_code
        left join (
          select count(kwm.id) as rejected, kwm.permanent_villward from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($11) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 group by kwm.permanent_villward
        ) as wmr on wmr.permanent_villward = vm.village_ward_code
        left join (
          select count(kwm.id) as permanent, kwm.permanent_villward from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ($12) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 group by kwm.permanent_villward
        ) as wms on wms.permanent_villward = vm.village_ward_code
        where vm.is_active=$1 and vm.block_mun_code=$14 order by vm.village_ward_name`,
        [
          1,
          start,
          end,
          "Y",
          "P" /*5*/,
          "A",
          "BA" /*6,7*/,
          "B",
          "BP",
          "BI" /*8,9,10*/,
          "R" /*11*/,
          "C" /*12*/,
          "DS-SEP2023" /*13*/,
          Number(block),
        ]
      );
      // For SELECTED Block ends ------
    }
  }

  res.status(StatusCodes.OK).json({ data });
};
// Duare Sarkar (DS) Application report ends ---

// Duare Sarkar (DS) Static Cumulative 5pm report starts ---
export const dsMigrationStatusReport = async (req, res) => {
  const { dist, subdiv, block, ward, startDate } = req.query;

  const start = formatStartDate(startDate);
  const values = [1, start];

  if (dist === process.env.ALL_DISTRICTS_CODE) {
    const text = migAllDist();
    const data = await pool.query(text, values);
    res.status(StatusCodes.OK).json({ data });
  } else {
    let data;
    if (dist && !subdiv) {
      const text = migDist(dist);
      data = await pool.query(text, values);
    }
    if (subdiv && !block) {
      const text = migSubdiv(subdiv);
      data = await pool.query(text, values);
    }
    if (block && !ward) {
      const text = migBlock(block);
      data = await pool.query(text, values);
    }
    if (ward) {
      const text = migWard(ward);
      data = await pool.query(text, values);
    }
    res.status(StatusCodes.OK).json({ data });
  }
};
// Duare Sarkar (DS) Static Cumulative 5pm report ends ---
