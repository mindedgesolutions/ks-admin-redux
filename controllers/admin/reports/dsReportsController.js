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
        SELECT count(kwm.id) AS provisional, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping AS kdm ON kwm.id=kdm.application_id WHERE kwm.is_active=$1 AND kwm.status in ($5) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 GROUP BY kwm.permanent_dist
      ) AS wmp ON wmp.permanent_dist = dm.district_code
      LEFT JOIN (
        SELECT count(kwm.id) AS docuploaded, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping AS kdm ON kwm.id=kdm.application_id WHERE kwm.is_active=$1 AND kwm.status in ($6, $7) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 GROUP BY kwm.permanent_dist
      ) AS wmd ON wmd.permanent_dist = dm.district_code
      LEFT JOIN (
        SELECT count(kwm.id) AS underprocess, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping AS kdm ON kwm.id=kdm.application_id WHERE kwm.is_active=$1 AND kwm.status in ($8, $9, $10) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 GROUP BY kwm.permanent_dist
      ) AS wmu ON wmu.permanent_dist = dm.district_code
      LEFT JOIN (
        SELECT count(kwm.id) AS rejected, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping AS kdm ON kwm.id=kdm.application_id WHERE kwm.is_active=$1 AND kwm.status in ($11) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 GROUP BY kwm.permanent_dist
      ) AS wmr ON wmr.permanent_dist = dm.district_code
      LEFT JOIN (
        SELECT count(kwm.id) AS permanent, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping AS kdm ON kwm.id=kdm.application_id WHERE kwm.is_active=$1 AND kwm.status in ($12) AND kdm.created_date between $2 AND $3 AND kwm.flag=$13 AND kdm.is_active=$1 AND kdm.service_provided=$4 GROUP BY kwm.permanent_dist
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
  } else {
    // if (dist && !subdiv) {
    //   data = await pool.query(
    //     `select sm.district_name,
    //     sm.subdiv_code,
    //     sm.subdiv_name,
    //     wmp.provisional,
    //     wmd.docUploaded,
    //     wms.submitted,
    //     wmr.rejected
    //     from master_subdivision as sm
    //     left JOIN (
    //       select count(k_migrant_worker_master.id) as provisional, k_migrant_worker_master.permanent_subdivision from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 AND k_migrant_worker_master.status=$4 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_subdivision
    //     ) as wmp on wmp.permanent_subdivision = sm.subdiv_code
    //     left join (
    //       select count(k_migrant_worker_master.id) as docUploaded, k_migrant_worker_master.permanent_subdivision from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$5 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_subdivision
    //     ) as wmd on wmd.permanent_subdivision = sm.subdiv_code
    //     left join (
    //       select count(k_migrant_worker_master.id) as submitted, k_migrant_worker_master.permanent_subdivision from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$6 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_subdivision
    //     ) as wms on wms.permanent_subdivision = sm.subdiv_code
    //     left join (
    //       select count(k_migrant_worker_master.id) as rejected, k_migrant_worker_master.permanent_subdivision from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$7 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_subdivision
    //     ) as wmr on wmr.permanent_subdivision = sm.subdiv_code
    //     where sm.is_active=$8 and sm.district_code=$9 order by sm.subdiv_name`,
    //     [1, start, end, "P", "A", "C", "R", 1, Number(dist)]
    //   );
    // }
  }
  console.log(data);

  res.status(StatusCodes.OK).json({ data });

  // if (dist === process.env.ALL_DISTRICTS_CODE) {
  //   const text = appAllDist();
  //   const data = await pool.query(text, values);
  //   res.status(StatusCodes.OK).json({ data });
  // } else {
  //   let data;
  //   if (dist && !subdiv) {
  //     const text = appDist(dist);
  //     data = await pool.query(text, values);
  //   }
  //   if (subdiv && !block) {
  //     const text = appSubdiv(subdiv);
  //     data = await pool.query(text, values);
  //   }
  //   if (block && !ward) {
  //     const text = appBlock(block);
  //     data = await pool.query(text, values);
  //   }
  //   if (ward) {
  //     const text = appWard(ward);
  //     data = await pool.query(text, values);
  //   }
  //   res.status(StatusCodes.OK).json({ data });
  // }
};
// Duare Sarkar (DS) Application report ends ---

// Duare Sarkar (DS) Migration report starts ---
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
// Duare Sarkar (DS) Migration report ends ---
