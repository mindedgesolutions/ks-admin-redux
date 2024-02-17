// DS Application status for all districts starts ------
export const appAllDist = () => {
  return `select dm.district_name,
    dm.district_code,
    wmp.provisional,
    wmd.docUploaded,
    wms.submitted,
    wmr.rejected
    from master_district as dm
    left join (
        select count(k_migrant_worker_master.id) as provisional, k_migrant_worker_master.permanent_dist from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$4 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_dist
    ) as wmp on wmp.permanent_dist = dm.district_code
    left join (
        select count(k_migrant_worker_master.id) as docUploaded, k_migrant_worker_master.permanent_dist from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$5 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_dist
    ) as wmd on wmd.permanent_dist = dm.district_code
    left join (
        select count(k_migrant_worker_master.id) as submitted, k_migrant_worker_master.permanent_dist from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$6 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_dist
    ) as wms on wms.permanent_dist = dm.district_code
    left join (
        select count(k_migrant_worker_master.id) as rejected, k_migrant_worker_master.permanent_dist from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$7 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_dist
    ) as wmr on wmr.permanent_dist = dm.district_code

    where dm.is_active=$8 and dm.state_code=1 order by dm.district_name`;
};
// DS Application status for all districts ends ------

// DS Application status : district selected starts ------
export const appDist = (dist) => {
  return `select sm.district_name,
    sm.subdiv_code,
    sm.subdiv_name,
    wmp.provisional,
    wmd.docUploaded,
    wms.submitted,
    wmr.rejected
    from master_subdivision as sm
    left join (
        select count(k_migrant_worker_master.id) as provisional, k_migrant_worker_master.permanent_subdivision from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$4 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_subdivision
    ) as wmp on wmp.permanent_subdivision = sm.subdiv_code
    left join (
        select count(k_migrant_worker_master.id) as docUploaded, k_migrant_worker_master.permanent_subdivision from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$5 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_subdivision
    ) as wmd on wmd.permanent_subdivision = sm.subdiv_code
    left join (
        select count(k_migrant_worker_master.id) as submitted, k_migrant_worker_master.permanent_subdivision from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$6 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_subdivision
    ) as wms on wms.permanent_subdivision = sm.subdiv_code
    left join (
        select count(k_migrant_worker_master.id) as rejected, k_migrant_worker_master.permanent_subdivision from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$7 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_subdivision
    ) as wmr on wmr.permanent_subdivision = sm.subdiv_code

    where sm.is_active=$8 and sm.district_code=${dist} order by sm.subdiv_name`;
};
// DS Application status : district selected ends ------

// DS Application status : subdivision selected starts ------
export const appSubdiv = (subdiv) => {
  return `select sm.subdiv_name,
    bm.block_mun_code,
    bm.block_mun_name,
    wmp.provisional,
    wmd.docUploaded,
    wms.submitted,
    wmr.rejected
    from master_block_mun as bm
    join master_subdivision as sm on sm.subdiv_code=bm.subdiv_code
    left join (
        select count(k_migrant_worker_master.id) as provisional, k_migrant_worker_master.permanent_areacode from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$4 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_areacode
    ) as wmp on wmp.permanent_areacode = bm.block_mun_code
    left join (
        select count(k_migrant_worker_master.id) as docUploaded, k_migrant_worker_master.permanent_areacode from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$5 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_areacode
    ) as wmd on wmd.permanent_areacode = bm.block_mun_code
    left join (
        select count(k_migrant_worker_master.id) as submitted, k_migrant_worker_master.permanent_areacode from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$6 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_areacode
    ) as wms on wms.permanent_areacode = bm.block_mun_code
    left join (
        select count(k_migrant_worker_master.id) as rejected, k_migrant_worker_master.permanent_areacode from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$7 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_areacode
    ) as wmr on wmr.permanent_areacode = bm.block_mun_code

    where sm.is_active=$8 and bm.subdiv_code=${subdiv} order by bm.block_mun_name`;
};
// DS Application status : subdivision selected ends ------

// DS Application status : block selected starts ------
export const appBlock = (block) => {
  return `select vm.village_ward_name,
    vm.village_ward_code,
    vm.block_mun_code,
    bm.block_mun_name,
    wmp.provisional,
    wmd.docUploaded,
    wms.submitted,
    wmr.rejected
    from master_village_ward as vm
    join master_block_mun as bm on bm.block_mun_code=vm.block_mun_code
    left join (
        select count(k_migrant_worker_master.id) as provisional, k_migrant_worker_master.permanent_villward from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$4 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_villward
    ) as wmp on wmp.permanent_villward = vm.village_ward_code
    left join (
        select count(k_migrant_worker_master.id) as docUploaded, k_migrant_worker_master.permanent_villward from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$5 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_villward
    ) as wmd on wmd.permanent_villward = vm.village_ward_code
    left join (
        select count(k_migrant_worker_master.id) as submitted, k_migrant_worker_master.permanent_villward from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$6 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_villward
    ) as wms on wms.permanent_villward = vm.village_ward_code
    left join (
        select count(k_migrant_worker_master.id) as rejected, k_migrant_worker_master.permanent_villward from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$7 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_villward
    ) as wmr on wmr.permanent_villward = vm.village_ward_code

    where vm.is_active=$8 and vm.block_mun_code=${block} order by vm.village_ward_name`;
};
// DS Application status : block selected ends ------

// DS Application status : ward selected starts ------
export const appWard = (ward) => {
  return `select vm.village_ward_name,
    vm.village_ward_code,
    vm.block_mun_code,
    bm.block_mun_name,
    wmp.provisional,
    wmd.docUploaded,
    wms.submitted,
    wmr.rejected
    from master_village_ward as vm
    join master_block_mun as bm on bm.block_mun_code=vm.block_mun_code
    left join (
        select count(k_migrant_worker_master.id) as provisional, k_migrant_worker_master.permanent_villward from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$4 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_villward
    ) as wmp on wmp.permanent_villward = vm.village_ward_code
    left join (
        select count(k_migrant_worker_master.id) as docUploaded, k_migrant_worker_master.permanent_villward from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$5 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_villward
    ) as wmd on wmd.permanent_villward = vm.village_ward_code
    left join (
        select count(k_migrant_worker_master.id) as submitted, k_migrant_worker_master.permanent_villward from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$6 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_villward
    ) as wms on wms.permanent_villward = vm.village_ward_code
    left join (
        select count(k_migrant_worker_master.id) as rejected, k_migrant_worker_master.permanent_villward from k_migrant_worker_master WHERE k_migrant_worker_master.is_active=$1 and k_migrant_worker_master.status=$7 and created_date between $2 and $3 group by k_migrant_worker_master.permanent_villward
    ) as wmr on wmr.permanent_villward = vm.village_ward_code

    where vm.is_active=$8 and vm.village_ward_code=${ward} order by vm.village_ward_name`;
};
// DS Application status : ward selected ends ------
