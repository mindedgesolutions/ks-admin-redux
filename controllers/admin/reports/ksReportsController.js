import * as dotenv from "dotenv";
dotenv.config();
import pool from "../../../db.js";
import { StatusCodes } from "http-status-codes";
import { formatEndDate, formatStartDate } from "../../../utils/functions.js";

// KS Application report (WITH FILTERS) starts ------
export const ksApplicationStatusReport = async (req, res) => {
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
      from master_district dm
      left join (
        select count(krm.id) AS provisional, kwm.permanent_dist from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('P') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_dist
      ) AS wmp ON wmp.permanent_dist = dm.district_code
      left join (
        select count(krm.id) AS docuploaded, kwm.permanent_dist from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('A', 'BA') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_dist
      ) AS wmd ON wmd.permanent_dist = dm.district_code
      left join (
        select count(krm.id) AS underprocess, kwm.permanent_dist from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('B', 'BP', 'BI') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_dist
      ) AS wmu ON wmu.permanent_dist = dm.district_code
      left join (
        select count(krm.id) AS rejected, kwm.permanent_dist from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('R') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_dist
      ) AS wmr ON wmr.permanent_dist = dm.district_code
      left join (
        select count(krm.id) AS permanent, kwm.permanent_dist from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('C') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_dist
      ) AS wms ON wms.permanent_dist = dm.district_code
      where dm.is_active=1 AND dm.state_code=1 order by dm.district_name`,
      [start, end]
    );
  } else {
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
          select count(krm.id) AS provisional, kwm.permanent_subdivision from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('P') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_subdivision
        ) AS wmp ON wmp.permanent_subdivision = sm.subdiv_code
        LEFT JOIN (
          select count(krm.id) AS docuploaded, kwm.permanent_subdivision from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('A', 'BA') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_subdivision
        ) AS wmd ON wmd.permanent_subdivision = sm.subdiv_code
        LEFT JOIN (
          select count(krm.id) AS underprocess, kwm.permanent_subdivision from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('B', 'BP', 'BI') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_subdivision
        ) AS wmu ON wmu.permanent_subdivision = sm.subdiv_code
        LEFT JOIN (
          select count(krm.id) AS rejected, kwm.permanent_subdivision from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('R') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_subdivision
        ) AS wmr ON wmr.permanent_subdivision = sm.subdiv_code
        LEFT JOIN (
          select count(krm.id) AS permanent, kwm.permanent_subdivision from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('C') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_subdivision
        ) AS wms ON wms.permanent_subdivision = sm.subdiv_code
        WHERE sm.is_active=1 AND sm.district_code=$3 ORDER BY sm.subdiv_name`,
        [start, end, Number(dist)]
      );
    } else if (subdiv && !block) {
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
          select count(krm.id) AS provisional, kwm.permanent_areacode from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('P') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_areacode
        ) AS wmp ON wmp.permanent_areacode = bm.block_mun_code
        left join (
          select count(krm.id) AS docuploaded, kwm.permanent_areacode from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('A', 'BA') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_areacode
        ) AS wmd ON wmd.permanent_areacode = bm.block_mun_code
        left join (
          select count(krm.id) AS underprocess, kwm.permanent_areacode from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('B', 'BP', 'BI') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_areacode
        ) AS wmu ON wmu.permanent_areacode = bm.block_mun_code
        left join (
          select count(krm.id) AS rejected, kwm.permanent_areacode from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('R') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_areacode
        ) AS wmr ON wmr.permanent_areacode = bm.block_mun_code
        left join (
          select count(krm.id) AS permanent, kwm.permanent_areacode from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('C') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_areacode
        ) AS wms ON wms.permanent_areacode = bm.block_mun_code
        where sm.is_active=1 and bm.is_active=1 and sm.subdiv_code=$3 order by bm.block_mun_name`,
        [start, end, Number(subdiv)]
      );
    } else if (block) {
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
          select count(krm.id) AS provisional, kwm.permanent_villward from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('P') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_villward
        ) as wmp on wmp.permanent_villward = vm.village_ward_code
        left join (
          select count(krm.id) AS docuploaded, kwm.permanent_villward from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('A', 'BA') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_villward
        ) as wmd on wmd.permanent_villward = vm.village_ward_code
        left join (
          select count(krm.id) AS underprocess, kwm.permanent_villward from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('B', 'BP', 'BI') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_villward
        ) as wmu on wmu.permanent_villward = vm.village_ward_code
        left join (
          select count(krm.id) AS rejected, kwm.permanent_villward from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('R') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_villward
        ) as wmr on wmr.permanent_villward = vm.village_ward_code
        left join (
          select count(krm.id) AS permanent, kwm.permanent_villward from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('C') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_villward
        ) as wms on wms.permanent_villward = vm.village_ward_code
        where vm.is_active=1 and bm.is_active=1 and bm.block_mun_code=$3 order by vm.village_ward_name`,
        [start, end, Number(block)]
      );
    }
  }

  res.status(StatusCodes.OK).json({ data });
};
// KS Application report (WITH FILTERS) ends ------

// KS Application report (ALL 480 WARDS) starts ------
export const ksApplicationStatusReportAll = async (req, res) => {
  const { dist, subdiv, block, startDate, endDate } = req.query;

  const start = formatStartDate(startDate);
  const end = formatEndDate(endDate);

  let data;

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
      select count(krm.id) AS provisional, kwm.permanent_areacode from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('P') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_areacode
    ) as wmp on wmp.permanent_areacode = bm.block_mun_code
    left join (
      select count(krm.id) AS docuploaded, kwm.permanent_areacode from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('A', 'BA') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_areacode
    ) as wmd on wmd.permanent_areacode = bm.block_mun_code
    left join (
      select count(krm.id) AS underprocess, kwm.permanent_areacode from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('B', 'BP', 'BI') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_areacode
    ) as wmu on wmu.permanent_areacode = bm.block_mun_code
    left join (
      select count(krm.id) AS rejected, kwm.permanent_areacode from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('R') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_areacode
    ) as wmr on wmr.permanent_areacode = bm.block_mun_code
    left join (
      select count(krm.id) AS permanent, kwm.permanent_areacode from k_migrant_worker_master kwm join k_migrant_worker_remark_master krm on kwm.id=krm.application_id where kwm.status is not null and kwm.status != 'I' and krm.status in ('C') and krm.remark_date_l between $1 AND $2 and kwm.is_active=1 group by kwm.permanent_areacode
    ) as wms on wms.permanent_areacode = bm.block_mun_code
    where sm.is_active=1 and bm.is_active=1 order by bm.block_mun_name`,
    [start, end]
  );

  res.status(StatusCodes.OK).json({ data });
};
// Duare Sarkar (DS) Application report (ALL 480 WARDS) ends ------

// KS Origination report (ALL 480 WARDS) starts ------
export const ksOrigination = async (req, res) => {
  const { dist, subdiv, block } = req.query;

  let data;

  if (dist === process.env.ALL_DISTRICTS_CODE) {
    data = await pool.query(
      `select dm.district_code,
      dm.district_name,
      sum(case when kwm.flag_web_app='W' then 1 else 0 end) as totalweb,
      sum(case when kwm.flag_web_app='A' then 1 else 0 end) as totalapp,
      sum(case when kwm.flag ilike '%BSK%' then 1 else 0 end) as totalbsk,
      sum(case when kwm.flag ilike '%DS%' then 1 else 0 end) as totalds,
      sum(case when kwm.flag ilike '%SD%' then 1 else 0 end) as totalsd
      from master_district dm
      join k_migrant_worker_master kwm on dm.district_code = kwm.permanent_dist
      where kwm.status is not null and kwm.status != '' and dm.is_active=1 and dm.state_code=1
      group by dm.district_code, dm.district_name
      order by dm.district_name`,
      []
    );
  } else {
    if (dist && !subdiv) {
      data = await pool.query(
        `select sm.district_name,
        sm.district_code,
        sm.subdiv_code,
        sm.subdiv_name,
        sum(case when kwm.flag_web_app='W' then 1 else 0 end) as totalweb,
        sum(case when kwm.flag_web_app='A' then 1 else 0 end) as totalapp,
        sum(case when kwm.flag ilike '%BSK%' then 1 else 0 end) as totalbsk,
        sum(case when kwm.flag ilike '%DS%' then 1 else 0 end) as totalds,
        sum(case when kwm.flag ilike '%SD%' then 1 else 0 end) as totalsd
        from master_subdivision sm
        join k_migrant_worker_master kwm on sm.subdiv_code = kwm.permanent_subdivision
        where kwm.status is not null and kwm.status != '' and sm.is_active=1 and sm.district_code=$1
        group by sm.district_code, sm.district_name, sm.subdiv_code, sm.subdiv_name
        order by sm.subdiv_name`,
        [Number(dist)]
      );
    } else if (subdiv && !block) {
      data = await pool.query(
        `select sm.subdiv_name,
        sm.district_code,
        sm.subdiv_code,
        bm.block_mun_code,
        bm.block_mun_name,
        sum(case when kwm.flag_web_app='W' then 1 else 0 end) as totalweb,
        sum(case when kwm.flag_web_app='A' then 1 else 0 end) as totalapp,
        sum(case when kwm.flag ilike '%BSK%' then 1 else 0 end) as totalbsk,
        sum(case when kwm.flag ilike '%DS%' then 1 else 0 end) as totalds,
        sum(case when kwm.flag ilike '%SD%' then 1 else 0 end) as totalsd
        from master_block_mun bm
        join master_subdivision sm ON sm.subdiv_code=bm.subdiv_code
        join k_migrant_worker_master kwm on bm.block_mun_code = kwm.permanent_areacode
        where kwm.status is not null and kwm.status != '' and bm.is_active=1 and bm.subdiv_code=$1
        group by sm.district_code, sm.subdiv_code, sm.subdiv_name, bm.block_mun_code, bm.block_mun_name
        order by bm.block_mun_name`,
        [Number(subdiv)]
      );
    } else if (block) {
      data = await pool.query(
        `select vm.village_ward_name,
        vm.village_ward_code,
        bm.block_mun_code,
        bm.block_mun_name,
        sm.district_code,
        sm.subdiv_code,
        sum(case when kwm.flag_web_app='W' then 1 else 0 end) as totalweb,
        sum(case when kwm.flag_web_app='A' then 1 else 0 end) as totalapp,
        sum(case when kwm.flag ilike '%BSK%' then 1 else 0 end) as totalbsk,
        sum(case when kwm.flag ilike '%DS%' then 1 else 0 end) as totalds,
        sum(case when kwm.flag ilike '%SD%' then 1 else 0 end) as totalsd
        from master_village_ward vm
        join master_block_mun bm on bm.block_mun_code=vm.block_mun_code
        join master_subdivision sm on sm.subdiv_code=bm.subdiv_code
        join k_migrant_worker_master kwm on vm.village_ward_code = kwm.permanent_villward
        where kwm.status is not null and kwm.status != '' and vm.is_active=1 and bm.block_mun_code=$1
        group by sm.district_code, sm.subdiv_code, bm.block_mun_code, bm.block_mun_name, vm.village_ward_code, vm.village_ward_name
        order by vm.village_ward_name`,
        [Number(block)]
      );
    }
  }

  res.status(StatusCodes.OK).json({ data });
};

export const ksOriginationDetails = async (req, res) => {
  const { dist, subdiv, block } = req.query;
  let data = [];
  const flags = ["BSK", "DS", "SD"];

  for (const flag of flags) {
    let result;

    if (dist && !subdiv) {
      result = await pool.query(
        `select sm.district_name,
        sm.district_code,
        sm.subdiv_code,
        sm.subdiv_name,
        count(case when kwm.status in ('P') then 1 else null end) totalprovisional,
        count(case when kwm.status in ('A', 'BA') then 1 else null end) totalsubmitted,
        count(case when kwm.status in ('B', 'BP', 'BI') then 1 else null end) totalback,
        count(case when kwm.status in ('R') then 1 else null end) totalrejected,
        count(case when kwm.status in ('C') then 1 else null end) totalapproved
        from master_subdivision sm
        join k_migrant_worker_master kwm on sm.subdiv_code = kwm.permanent_subdivision
        where kwm.is_active=1 and sm.is_active=1 and sm.district_code=$1 and kwm.flag ilike '%${flag}%'
        group by sm.district_code, sm.district_name, sm.subdiv_code, sm.subdiv_name
        order by sm.subdiv_name`,
        [Number(dist)]
      );
    } else if (subdiv && !block) {
      result = await pool.query(
        `select sm.subdiv_name,
        sm.district_code,
        sm.subdiv_code,
        bm.block_mun_code,
        bm.block_mun_name,
        count(case when kwm.status in ('P') then 1 else null end) provisional,
        count(case when kwm.status in ('A', 'BA') then 1 else null end) totalsubmitted,
        count(case when kwm.status in ('B', 'BP', 'BI') then 1 else null end) totalback,
        count(case when kwm.status in ('R') then 1 else null end) totalrejected,
        count(case when kwm.status in ('C') then 1 else null end) totalapproved
        from master_block_mun bm
        join master_subdivision sm ON sm.subdiv_code=bm.subdiv_code
        join k_migrant_worker_master kwm on bm.block_mun_code = kwm.permanent_areacode
        where bm.is_active=1 and kwm.is_active=1 and bm.subdiv_code=$1 and kwm.flag ilike '%${flag}%'
        group by sm.district_code, sm.subdiv_code, sm.subdiv_name, bm.block_mun_code, bm.block_mun_name
        order by bm.block_mun_name`,
        [Number(subdiv)]
      );
    } else if (block) {
      result = await pool.query(
        `select vm.village_ward_name,
        vm.village_ward_code,
        bm.block_mun_code,
        bm.block_mun_name,
        sm.district_code,
        sm.subdiv_code,
        count(case when kwm.status in ('P') then 1 else null end) provisional,
        count(case when kwm.status in ('A', 'BA') then 1 else null end) totalsubmitted,
        count(case when kwm.status in ('B', 'BP', 'BI') then 1 else null end) totalback,
        count(case when kwm.status in ('R') then 1 else null end) totalrejected,
        count(case when kwm.status in ('C') then 1 else null end) totalapproved
        from master_village_ward vm
        join master_block_mun bm on bm.block_mun_code=vm.block_mun_code
        join master_subdivision sm on sm.subdiv_code=bm.subdiv_code
        join k_migrant_worker_master kwm on vm.village_ward_code = kwm.permanent_villward
        where vm.is_active=1 and kwm.is_active=1 and bm.block_mun_code=$1 and kwm.flag ilike '%${flag}%'
        group by sm.district_code, sm.subdiv_code, bm.block_mun_code, bm.block_mun_name, vm.village_ward_code, vm.village_ward_name
        order by vm.village_ward_name`,
        [Number(block)]
      );
    }
    data.push(result);
  }

  res.status(StatusCodes.OK).json({ data });
};
// KS Origination report (ALL 480 WARDS) ends ------
