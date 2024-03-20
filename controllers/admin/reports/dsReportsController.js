import * as dotenv from "dotenv";
dotenv.config();
import pool from "../../../db.js";
import { StatusCodes } from "http-status-codes";
import { formatEndDate, formatStartDate } from "../../../utils/functions.js";
import { paginationLogic } from "../../../utils/pagination.js";

// Duare Sarkar (DS) Application report starts ------ >>

// Duare Sarkar (DS) Application report (WITH FILTERS) starts ------
export const dsApplicationStatusReport = async (req, res) => {
  const { dist, subdiv, block, startDate, endDate, version } = req.query;

  const start = formatStartDate(startDate);
  const end = formatEndDate(endDate);
  const dbFlag = Number(version) === 7 ? `DS-SEP2023` : "";

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
      FROM master_district dm
      LEFT JOIN (
        SELECT count(kwm.id) AS provisional, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status IN ('P') AND kdm.created_date between $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' GROUP BY kwm.permanent_dist
      ) AS wmp ON wmp.permanent_dist = dm.district_code
      LEFT JOIN (
        SELECT count(kwm.id) AS docuploaded, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status IN ('A', 'BA') AND kdm.created_date between $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' GROUP BY kwm.permanent_dist
      ) AS wmd ON wmd.permanent_dist = dm.district_code
      LEFT JOIN (
        SELECT count(kwm.id) AS underprocess, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status IN ('B', 'BP', 'BI') AND kdm.created_date between $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' GROUP BY kwm.permanent_dist
      ) AS wmu ON wmu.permanent_dist = dm.district_code
      LEFT JOIN (
        SELECT count(kwm.id) AS rejected, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status IN ('R') AND kdm.created_date between $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' GROUP BY kwm.permanent_dist
      ) AS wmr ON wmr.permanent_dist = dm.district_code
      LEFT JOIN (
        SELECT count(kwm.id) AS permanent, kwm.permanent_dist FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status IN ('C') AND kdm.created_date between $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' GROUP BY kwm.permanent_dist
      ) AS wms ON wms.permanent_dist = dm.district_code

      WHERE dm.is_active=$1 AND dm.state_code=1 ORDER BY dm.district_name`,
      [1, start, end, dbFlag]
    );
    // For ALL Districts ends ------
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
          SELECT count(kwm.id) AS provisional, kwm.permanent_subdivision FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('P') AND kdm.created_date BETWEEN $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' GROUP BY kwm.permanent_subdivision
        ) AS wmp ON wmp.permanent_subdivision = sm.subdiv_code
        LEFT JOIN (
          SELECT count(kwm.id) AS docuploaded, kwm.permanent_subdivision FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('A', 'BA') AND kdm.created_date BETWEEN $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' GROUP BY kwm.permanent_subdivision
        ) AS wmd ON wmd.permanent_subdivision = sm.subdiv_code
        LEFT JOIN (
          SELECT count(kwm.id) AS underprocess, kwm.permanent_subdivision FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('B', 'BP', 'BI') AND kdm.created_date BETWEEN $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' GROUP BY kwm.permanent_subdivision
        ) AS wmu ON wmu.permanent_subdivision = sm.subdiv_code
        LEFT JOIN (
          SELECT count(kwm.id) AS rejected, kwm.permanent_subdivision FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('R') AND kdm.created_date BETWEEN $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' GROUP BY kwm.permanent_subdivision
        ) AS wmr ON wmr.permanent_subdivision = sm.subdiv_code
        LEFT JOIN (
          SELECT count(kwm.id) AS permanent, kwm.permanent_subdivision FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('C') AND kdm.created_date BETWEEN $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' GROUP BY kwm.permanent_subdivision
        ) AS wms ON wms.permanent_subdivision = sm.subdiv_code
        WHERE sm.is_active=$1 AND sm.district_code=$5 ORDER BY sm.subdiv_name`,
        [1, start, end, dbFlag, Number(dist)]
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
          SELECT count(kwm.id) AS provisional, kwm.permanent_areacode FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('P') AND kdm.created_date BETWEEN $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' GROUP BY kwm.permanent_areacode
        ) AS wmp ON wmp.permanent_areacode = bm.block_mun_code
        left join (
          SELECT count(kwm.id) AS docuploaded, kwm.permanent_areacode FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('A', 'BA') AND kdm.created_date BETWEEN $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' GROUP BY kwm.permanent_areacode
        ) AS wmd ON wmd.permanent_areacode = bm.block_mun_code
        left join (
          SELECT count(kwm.id) AS underprocess, kwm.permanent_areacode FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('B', 'BP', 'BI') AND kdm.created_date BETWEEN $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' GROUP BY kwm.permanent_areacode
        ) AS wmu ON wmu.permanent_areacode = bm.block_mun_code
        left join (
          SELECT count(kwm.id) AS rejected, kwm.permanent_areacode FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('R') AND kdm.created_date BETWEEN $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' GROUP BY kwm.permanent_areacode
        ) AS wmr ON wmr.permanent_areacode = bm.block_mun_code
        left join (
          SELECT count(kwm.id) AS permanent, kwm.permanent_areacode FROM k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('C') AND kdm.created_date BETWEEN $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' GROUP BY kwm.permanent_areacode
        ) AS wms ON wms.permanent_areacode = bm.block_mun_code
        where sm.is_active=$1 and bm.subdiv_code=$5 order by bm.block_mun_name`,
        [1, start, end, dbFlag, Number(subdiv)]
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
          select count(kwm.id) as provisional, kwm.permanent_villward from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('C') AND kdm.created_date between $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' group by kwm.permanent_villward
        ) as wmp on wmp.permanent_villward = vm.village_ward_code
        left join (
          select count(kwm.id) as docuploaded, kwm.permanent_villward from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('A', 'BA') AND kdm.created_date between $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' group by kwm.permanent_villward
        ) as wmd on wmd.permanent_villward = vm.village_ward_code
        left join (
          select count(kwm.id) as underprocess, kwm.permanent_villward from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('B', 'BP', 'BI') AND kdm.created_date between $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' group by kwm.permanent_villward
        ) as wmu on wmu.permanent_villward = vm.village_ward_code
        left join (
          select count(kwm.id) as rejected, kwm.permanent_villward from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('R') AND kdm.created_date between $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' group by kwm.permanent_villward
        ) as wmr on wmr.permanent_villward = vm.village_ward_code
        left join (
          select count(kwm.id) as permanent, kwm.permanent_villward from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('C') AND kdm.created_date between $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' group by kwm.permanent_villward
        ) as wms on wms.permanent_villward = vm.village_ward_code
        where vm.is_active=$1 and vm.block_mun_code=$5 order by vm.village_ward_name`,
        [1, start, end, dbFlag, Number(block)]
      );
      // For SELECTED Block ends ------
    }
  }

  res.status(StatusCodes.OK).json({ data });
};
// Duare Sarkar (DS) Application report (WITH FILTERS) ends ------

// Duare Sarkar (DS) Application report (ALL 480 WARDS) starts ------
export const dsApplicationStatusReportAll = async (req, res) => {
  const { startDate, endDate, version } = req.query;

  const start = formatStartDate(startDate);
  const end = formatEndDate(endDate);
  const dbFlag = Number(version) === 7 ? `DS-SEP2023` : "";

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
      select count(kwm.id) as provisional, kwm.permanent_areacode from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('C') AND kdm.created_date between $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' group by kwm.permanent_areacode
    ) as wmp on wmp.permanent_areacode = bm.block_mun_code
    left join (
      select count(kwm.id) as docuploaded, kwm.permanent_areacode from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('A', 'BA') AND kdm.created_date between $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' group by kwm.permanent_areacode
    ) as wmd on wmd.permanent_areacode = bm.block_mun_code
    left join (
      select count(kwm.id) as underprocess, kwm.permanent_areacode from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('B', 'BP', 'BI') AND kdm.created_date between $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' group by kwm.permanent_areacode
    ) as wmu on wmu.permanent_areacode = bm.block_mun_code
    left join (
      select count(kwm.id) as rejected, kwm.permanent_areacode from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('R') AND kdm.created_date between $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' group by kwm.permanent_areacode
    ) as wmr on wmr.permanent_areacode = bm.block_mun_code
    left join (
      select count(kwm.id) as permanent, kwm.permanent_areacode from k_migrant_worker_master kwm JOIN k_duaresarkar_application_mapping kdm ON kwm.id=kdm.application_id WHERE kwm.status IS NOT NULL and kwm.status in ('C') AND kdm.created_date between $2 AND $3 AND kwm.flag=$4 AND kdm.is_active=$1 AND kdm.service_provided='Y' group by kwm.permanent_areacode
    ) as wms on wms.permanent_areacode = bm.block_mun_code
    where sm.is_active=$1 and bm.is_active=$1 order by bm.block_mun_name`,
    [1, start, end, dbFlag]
  );
  res.status(StatusCodes.OK).json({ data });
};
// Duare Sarkar (DS) Application report (ALL 480 WARDS) ends ------

// Duare Sarkar (DS) Static Cumulative 5pm report starts ------
export const dsStaticReport = async (req, res) => {
  const { dist, subdiv, block } = req.query;

  let data;
  if (dist === process.env.ALL_DISTRICTS_CODE) {
    data = await pool.query(
      `SELECT district_name, district_code, sum(service_delivered) as delivered from ds_static_application_view group by district_code, district_name order by district_name`,
      []
    );
  } else {
    if (dist && !subdiv) {
      data = await pool.query(
        `SELECT district_name, district_code, subdiv_name, subdiv_code, sum(service_delivered) as delivered from ds_static_application_view where district_code=$1 group by district_name, district_code, subdiv_name, subdiv_code order by district_name, subdiv_name`,
        [dist]
      );
    } else if (subdiv && !block) {
      data = await pool.query(
        `SELECT subdiv_name, subdiv_code, block_mun_name, block_mun_code, sum(service_delivered) as delivered from ds_static_application_view where subdiv_code=$1 group by subdiv_name, subdiv_code, block_mun_name, block_mun_code order by subdiv_name, block_mun_name`,
        [subdiv]
      );
    } else if (block) {
      data = await pool.query(
        `SELECT subdiv_name, subdiv_code, block_mun_name, block_mun_code, sum(service_delivered) as delivered from ds_static_application_view where block_mun_code=$1 group by subdiv_name, subdiv_code, block_mun_name, block_mun_code order by subdiv_name, block_mun_name`,
        [block]
      );
    }
  }

  res.status(StatusCodes.OK).json({ data });
};
// Duare Sarkar (DS) Static Cumulative 5pm report ends ------

// Duare Sarkar (DS) Static Cumulative 5pm (ALL 480 WARDS) report starts ------
export const dsStaticReportAll = async (req, res) => {
  let data;
  data = await pool.query(
    `SELECT district_name, district_code, subdiv_name, subdiv_code, block_mun_name, block_mun_code, sum(service_delivered) as delivered from ds_static_application_view group by district_name, district_code, subdiv_name, subdiv_code, block_mun_name, block_mun_code order by district_name, subdiv_name, block_mun_name`,
    []
  );
  res.status(StatusCodes.OK).json({ data });
};
// Duare Sarkar (DS) Static Cumulative 5pm (ALL 480 WARDS) report ends ------

// Duare Sarkar (DS) DEO report starts ------
export const dsDeoCount = async (req, res) => {
  const { dist, subdiv, block } = req.query;

  let data;
  if (dist === process.env.ALL_DISTRICTS_CODE) {
    data = await pool.query(
      `SELECT dm.district_name,
      dm.district_code,
      deo.deocount
      from master_district dm
      LEFT JOIN (
        SELECT count(dui.id) AS deocount, dui.allotted_district FROM k_duaresarkar_user_info dui where dui.is_active=$1 GROUP BY dui.allotted_district
      ) AS deo ON deo.allotted_district = dm.district_code
      WHERE dm.is_active=$1 AND dm.state_code=1 ORDER BY dm.district_name`,
      [1]
    );
  } else {
    if (dist && !subdiv) {
      data = await pool.query(
        `select sm.district_name,
        sm.district_code,
        sm.subdiv_code,
        sm.subdiv_name,
        deo.deocount
        from master_subdivision as sm
        left JOIN (
          SELECT count(dui.id) AS deocount, dui.allotted_subdivision FROM k_duaresarkar_user_info dui where dui.is_active=$1 GROUP BY dui.allotted_subdivision
        ) as deo on deo.allotted_subdivision = sm.subdiv_code
        where sm.is_active=$1 and sm.district_code=$2 order by sm.subdiv_name`,
        [1, dist]
      );
    } else if (subdiv && !block) {
      data = await pool.query(
        `select sm.subdiv_name,
        sm.district_code,
        sm.subdiv_code,
        bm.block_mun_code,
        bm.block_mun_name,
        deo.deocount
        from master_block_mun as bm
        join master_subdivision as sm on sm.subdiv_code=bm.subdiv_code
        left JOIN (
          SELECT count(dui.id) AS deocount, dui.allotted_areatype_code FROM k_duaresarkar_user_info dui where dui.is_active=$1 GROUP BY dui.allotted_areatype_code
        ) as deo on deo.allotted_areatype_code = bm.block_mun_code
        where bm.is_active=$1 and bm.subdiv_code=$2 order by sm.subdiv_name, bm.block_mun_name`,
        [1, subdiv]
      );
    } else if (block) {
      data = await pool.query(
        `select bm.block_mun_code,
        sm.district_code,
        sm.subdiv_code,
        bm.block_mun_name,
        deo.deocount
        from master_block_mun as bm
        join master_subdivision as sm on sm.subdiv_code=bm.subdiv_code
        left JOIN (
          SELECT count(dui.id) AS deocount, dui.allotted_areatype_code FROM k_duaresarkar_user_info dui where dui.is_active=$1 GROUP BY dui.allotted_areatype_code
        ) as deo on deo.allotted_areatype_code = bm.block_mun_code
        where bm.is_active=$1 and bm.block_mun_code=$2 order by bm.block_mun_name`,
        [1, block]
      );
    }
  }
  res.status(StatusCodes.OK).json({ data });
};

export const dsDeoList = async (req, res) => {
  const { dist, subdiv, block, version, page, limit } = req.query;

  const pagination = paginationLogic(page, limit);
  const dbFlag = Number(version) === 7 ? `DS-SEP2023` : "AA";

  let data, condition;

  if (dist && !subdiv && !block) {
    condition = `uinfo.allotted_district = ${Number(dist)}`;
  } else if (dist && subdiv && !block) {
    condition = `uinfo.allotted_subdivision = ${Number(subdiv)}`;
  } else if (dist && subdiv && block) {
    condition = `uinfo.allotted_areatype_code = ${Number(block)}`;
  }

  data = await pool.query(
    `select t1.*,
      uinfo.mobile,
      uinfo.email,
      uinfo.name,
      uinfo.allotted_areatype_code
      from(
        SELECT
        count(case when dmp.application_status in ('P','BI','BP','B') then 1 else null end) provisional,
        count(case when dmp.application_status in ('C') then 1 else null end) approved,
        count(case when dmp.application_status in ('R') then 1 else null end) reject,
        count(case when dmp.application_status in ('A','BA') then 1 else null end) submitted,
        created_by
        from k_duaresarkar_application_mapping as dmp 
        where flag=$1
        and service_provided='Y' and application_status is not null and application_status!='I'
        group by created_by
      ) as t1
      join k_duaresarkar_user_info as uinfo on uinfo.user_id = t1.created_by 
      where $2
      order by uinfo.name asc offset $3 limit $4`,
    [dbFlag, condition, pagination.offset, pagination.pageLimit]
  );

  // if (dist && !subdiv && !block) {
  //   data = await pool.query(
  //     `select t1.*,
  //     uinfo.mobile,
  //     uinfo.email,
  //     uinfo.name,
  //     uinfo.allotted_areatype_code
  //     from(
  //       SELECT
  //       count(case when dmp.application_status in ('P','BI','BP','B') then 1 else null end) provisional,
  //       count(case when dmp.application_status in ('C') then 1 else null end) approved,
  //       count(case when dmp.application_status in ('R') then 1 else null end) reject,
  //       count(case when dmp.application_status in ('A','BA') then 1 else null end) submitted,
  //       created_by
  //       from k_duaresarkar_application_mapping as dmp
  //       where flag=$1
  //       and service_provided='Y' and application_status is not null and application_status!='I'
  //       group by created_by
  //     ) as t1
  //     join k_duaresarkar_user_info as uinfo on uinfo.user_id = t1.created_by
  //     where $2
  //     order by uinfo.name asc offset $3 limit $4`,
  //     [
  //       dbFlag,
  //       `uinfo.allotted_district = ${Number(dist)}`,
  //       pagination.offset,
  //       pagination.pageLimit,
  //     ]
  //   );
  // } else if (dist && subdiv && !block) {
  //   data = await pool.query(
  //     `select t1.*,
  //     uinfo.mobile,
  //     uinfo.email,
  //     uinfo.name,
  //     uinfo.allotted_areatype_code
  //     from(
  //       SELECT
  //       count(case when dmp.application_status in ('P','BI','BP','B') then 1 else null end) provisional,
  //       count(case when dmp.application_status in ('C') then 1 else null end) approved,
  //       count(case when dmp.application_status in ('R') then 1 else null end) reject,
  //       count(case when dmp.application_status in ('A','BA') then 1 else null end) submitted,
  //       created_by
  //       from k_duaresarkar_application_mapping as dmp
  //       where flag=$1
  //       and service_provided='Y' and application_status is not null and application_status!='I'
  //       group by created_by
  //     ) as t1
  //     join k_duaresarkar_user_info as uinfo on uinfo.user_id = t1.created_by
  //     where uinfo.allotted_subdivision=$2
  //     order by uinfo.name asc offset $3 limit $4`,
  //     [dbFlag, Number(subdiv), pagination.offset, pagination.pageLimit]
  //   );
  // } else if (dist && subdiv && block) {
  //   data = await pool.query(
  //     `select t1.*,
  //     uinfo.mobile,
  //     uinfo.email,
  //     uinfo.name,
  //     uinfo.allotted_areatype_code
  //     from(
  //       SELECT
  //       count(case when dmp.application_status in ('P','BI','BP','B') then 1 else null end) provisional,
  //       count(case when dmp.application_status in ('C') then 1 else null end) approved,
  //       count(case when dmp.application_status in ('R') then 1 else null end) reject,
  //       count(case when dmp.application_status in ('A','BA') then 1 else null end) submitted,
  //       created_by
  //       from k_duaresarkar_application_mapping as dmp
  //       where flag=$1
  //       and service_provided='Y' and application_status is not null and application_status!='I'
  //       group by created_by
  //     ) as t1
  //     join k_duaresarkar_user_info as uinfo on uinfo.user_id = t1.created_by
  //     where uinfo.allotted_areatype_code=$2
  //     order by uinfo.name asc offset $3 limit $4`,
  //     [dbFlag, Number(block), pagination.offset, pagination.pageLimit]
  //   );
  // }

  const totalPages = Math.ceil(data.rowCount / pagination.pageLimit);
  const meta = {
    totalPages: totalPages,
    currentPage: pagination.pageNo,
  };
  console.log(data);

  res.status(StatusCodes.OK).json({ data, meta });
};
// Duare Sarkar (DS) DEO report ends ------

// Duare Sarkar (DS) Application report ends ------ >>
