import { Router } from "express";
const router = Router();
import {
  dsApplicationStatusReport,
  dsApplicationStatusReportAll,
  dsDeoApplications,
  dsDeoCount,
  dsDeoEntries,
  dsDeoList,
  dsStaticReport,
  dsStaticReportAll,
} from "../controllers/admin/reports/dsReportsController.js";
import {
  bskApplicationStatusReport,
  bskApplicationStatusReportAll,
} from "../controllers/admin/reports/bskReportsController.js";
import {
  ksApplicationStatusReport,
  ksApplicationStatusReportAll,
  ksOrigination,
} from "../controllers/admin/reports/ksReportsController.js";

// DS starts ------
router.get("/ds-application-status", dsApplicationStatusReport);
router.get("/ds-application-status-all", dsApplicationStatusReportAll);
router.get("/ds-static", dsStaticReport);
router.get("/ds-static-all", dsStaticReportAll);
router.get("/deo-count", dsDeoCount);
router.get("/deo-list", dsDeoList);
router.get("/deo-entries", dsDeoEntries);
router.get("/deo-applications", dsDeoApplications);
// DS ends ------

// BSK starts ------
router.get("/bsk-application-status", bskApplicationStatusReport);
router.get("/bsk-application-status-all", bskApplicationStatusReportAll);
// BSK ends ------

// KS starts ------
router.get("/ks-application-status", ksApplicationStatusReport);
router.get("/ks-application-status-all", ksApplicationStatusReportAll);
router.get("/ks-origination", ksOrigination);
// KS ends ------

export default router;
