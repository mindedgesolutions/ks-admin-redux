import * as dotenv from "dotenv";
dotenv.config();
import pool from "../../../db.js";
import { StatusCodes } from "http-status-codes";
import { formatEndDate, formatStartDate } from "../../../utils/functions.js";

export const ksApplicationStatusReport = async (req, res) => {
  const { dist, subdiv, block, startDate, endDate } = req.query;

  const start = formatStartDate(startDate);
  const end = formatEndDate(endDate);

  let data;

  if (dist === process.env.ALL_DISTRICTS_CODE) {
    data = await pool.query(
      `select sm.district_name,
      sm.district_code,
      sm.subdiv_name,
      aldt.pcnt,
      aldt.dcucnt,
      aldt.ucnt,
      aldt.rcnt,
      aldt.acnt
      from master_district dm
      left join (
        select mstr.permanent_dist,
        count(case when rm.status in ('P') then 1 else null end) as pcnt,
        count(case when rm.status in ('A', 'BA') then 1 else null end) as dcucnt,
        count(case when rm.status in ('B', 'BP', 'BI') then 1 else null end) as ucnt,
        count(case when rm.status in ('R') then 1 else null end) as rcnt,
        count(case when rm.status in ('C') then 1 else null end) as acnt
        from (
          select max(id) as rmid, application_id 
          from k_migrant_worker_remark_master	krm	
          where status in ('P','A','B','BI','BP','BA','C','R') and krm.remark_date_l 
          between $1 and $2 group by application_id
        ) as t
        join k_migrant_worker_remark_master rm on rm.id = t.rmid
        join k_migrant_worker_master mstr on mstr.id = t.application_id
        group by mstr.permanent_dist
      ) as aldt on aldt.permanent_dist = dm.district_code
      where bm.is_active = 1 order by sm.district_name, sm.subdiv_name`,
      [start, end]
    );
  }

  res.status(StatusCodes.OK).json({ data });
};

export const ksApplicationStatusReportAll = async (req, res) => {};

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
