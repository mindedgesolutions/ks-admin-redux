import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  BskApplicationStatus,
  DsApplicationStatus,
  DsDeo,
  DsMigrationStatus,
  DsStaticAtFive,
  Error,
  KsApplicationStatus,
  Reports,
  SdStaticAtFive,
} from "../../pages";

import { loader as dsDistricts } from "../../pages/admin/reports/ds/DsApplicationStatus";

const ReportRoutes = () => {
  return (
    <Routes>
      <Route index={true} element={<Reports />} errorElement={<Error />} />
      <Route path="bsk/application-status" element={<BskApplicationStatus />} />
      <Route
        path="ds/application-status"
        element={<DsApplicationStatus />}
        loader={dsDistricts}
      />
      <Route path="ds/deo" element={<DsDeo />} />
      <Route path="ds/migration-status" element={<DsMigrationStatus />} />
      <Route path="ds/static" element={<DsStaticAtFive />} />
      <Route path="ks/application-status" element={<KsApplicationStatus />} />
      <Route path="sd/static" element={<SdStaticAtFive />} />
    </Routes>
  );
};

export default ReportRoutes;
