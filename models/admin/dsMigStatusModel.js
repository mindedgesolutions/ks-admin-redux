// DS Application status for all districts starts ------
export const migAllDist = () => {
  return `select dm.district_name,
    dm.district_code,
    wmm.migCount,
    wml.likelyMigCount
    from master_district as dm
    left join (
        select count(k_duaresarkar_application_mapping.id) as migCount, k_duaresarkar_application_mapping.camp_district from k_duaresarkar_application_mapping WHERE k_duaresarkar_application_mapping.is_active=$1 and k_duaresarkar_application_mapping.migrated_on <= $2 group by k_duaresarkar_application_mapping.camp_district
    ) as wmm on wmm.camp_district = dm.district_code
    left join (
        select count(k_duaresarkar_application_mapping.id) as likelyMigCount, k_duaresarkar_application_mapping.camp_district from k_duaresarkar_application_mapping WHERE k_duaresarkar_application_mapping.is_active=$1 and k_duaresarkar_application_mapping.migrated_on > $2 group by k_duaresarkar_application_mapping.camp_district
    ) as wml on wml.camp_district = dm.district_code

    where dm.is_active=1 and dm.state_code=1 order by dm.district_name`;
};
// DS Application status for all districts ends ------

// DS Application status : district selected starts ------
export const migDist = (dist) => {
  return `select sm.district_name,
    sm.subdiv_code,
    sm.subdiv_name,
    wmm.migCount,
    wml.likelyMigCount
    from master_subdivision as sm
    left join (
        select count(k_duaresarkar_application_mapping.id) as migCount, k_duaresarkar_application_mapping.camp_subdivision from k_duaresarkar_application_mapping WHERE k_duaresarkar_application_mapping.is_active=$1 and k_duaresarkar_application_mapping.migrated_on <= $2 group by k_duaresarkar_application_mapping.camp_subdivision
    ) as wmm on wmm.camp_subdivision = sm.subdiv_code
    left join (
        select count(k_duaresarkar_application_mapping.id) as likelyMigCount, k_duaresarkar_application_mapping.camp_subdivision from k_duaresarkar_application_mapping WHERE k_duaresarkar_application_mapping.is_active=$1 and k_duaresarkar_application_mapping.migrated_on > $2 group by k_duaresarkar_application_mapping.camp_subdivision
    ) as wml on wml.camp_subdivision = sm.subdiv_code

    where sm.is_active=1 and sm.district_code=${dist} order by sm.subdiv_name`;
};
// DS Application status : district selected ends ------

// DS Application status : subdivision selected starts ------
export const migSubdiv = (subdiv) => {
  return `select sm.subdiv_name,
    bm.block_mun_code,
    bm.block_mun_name,
    wmm.migCount,
    wml.likelyMigCount
    from master_block_mun as bm
    join master_subdivision as sm on sm.subdiv_code=bm.subdiv_code
    left join (
        select count(k_duaresarkar_application_mapping.id) as migCount, k_duaresarkar_application_mapping.camp_areacode from k_duaresarkar_application_mapping WHERE k_duaresarkar_application_mapping.is_active=$1 and k_duaresarkar_application_mapping.migrated_on <= $2 group by k_duaresarkar_application_mapping.camp_areacode
    ) as wmm on wmm.camp_areacode = bm.block_mun_code
    left join (
        select count(k_duaresarkar_application_mapping.id) as likelyMigCount, k_duaresarkar_application_mapping.camp_areacode from k_duaresarkar_application_mapping WHERE k_duaresarkar_application_mapping.is_active=$1 and k_duaresarkar_application_mapping.migrated_on > $2 group by k_duaresarkar_application_mapping.camp_areacode
    ) as wml on wml.camp_areacode = bm.block_mun_code

    where sm.is_active=1 and bm.subdiv_code=${subdiv} order by bm.block_mun_name`;
};
// DS Application status : subdivision selected ends ------

// DS Application status : block selected starts ------
export const migBlock = (block) => {
  return `select vm.village_ward_name,
    vm.village_ward_code,
    vm.block_mun_code,
    bm.block_mun_name,
    wmm.migCount,
    wml.likelyMigCount
    from master_village_ward as vm
    join master_block_mun as bm on bm.block_mun_code=vm.block_mun_code
    left join (
        select count(k_duaresarkar_application_mapping.id) as migCount, k_duaresarkar_application_mapping.camp_gpward from k_duaresarkar_application_mapping WHERE k_duaresarkar_application_mapping.is_active=$1 and k_duaresarkar_application_mapping.migrated_on <= $2 group by k_duaresarkar_application_mapping.camp_gpward
    ) as wmm on wmm.camp_gpward = vm.village_ward_code
    left join (
        select count(k_duaresarkar_application_mapping.id) as likelyMigCount, k_duaresarkar_application_mapping.camp_gpward from k_duaresarkar_application_mapping WHERE k_duaresarkar_application_mapping.is_active=$1 and k_duaresarkar_application_mapping.migrated_on > $2 group by k_duaresarkar_application_mapping.camp_gpward
    ) as wml on wml.camp_gpward = vm.village_ward_code

    where vm.is_active=1 and vm.block_mun_code=${block} order by vm.village_ward_name`;
};
// DS Application status : block selected ends ------

// DS Application status : ward selected starts ------
export const migWard = (ward) => {
  return `select vm.village_ward_name,
    vm.village_ward_code,
    vm.block_mun_code,
    bm.block_mun_name,
    wmm.migCount,
    wml.likelyMigCount
    from master_village_ward as vm
    join master_block_mun as bm on bm.block_mun_code=vm.block_mun_code
    left join (
        select count(k_duaresarkar_application_mapping.id) as migCount, k_duaresarkar_application_mapping.camp_gpward from k_duaresarkar_application_mapping WHERE k_duaresarkar_application_mapping.is_active=$1 and k_duaresarkar_application_mapping.migrated_on <= $2 group by k_duaresarkar_application_mapping.camp_gpward
    ) as wmm on wmm.camp_gpward = vm.village_ward_code
    left join (
        select count(k_duaresarkar_application_mapping.id) as likelyMigCount, k_duaresarkar_application_mapping.camp_gpward from k_duaresarkar_application_mapping WHERE k_duaresarkar_application_mapping.is_active=$1 and k_duaresarkar_application_mapping.migrated_on > $2 group by k_duaresarkar_application_mapping.camp_gpward
    ) as wml on wml.camp_gpward = vm.village_ward_code

    where vm.is_active=1 and vm.village_ward_code=${ward} order by vm.village_ward_name`;
};
// DS Application status : ward selected ends ------
