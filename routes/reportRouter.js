import { Router } from "express";
const router = Router();
import {
  dsApplicationStatusReport,
  dsApplicationStatusReportAll,
  dsDeoCount,
  dsDeoEntries,
  dsDeoList,
  dsStaticReport,
  dsStaticReportAll,
} from "../controllers/admin/reports/dsReportsController.js";

router.get("/ds-application-status", dsApplicationStatusReport);
router.get("/ds-application-status-all", dsApplicationStatusReportAll);
router.get("/ds-static", dsStaticReport);
router.get("/ds-static-all", dsStaticReportAll);
router.get("/deo-count", dsDeoCount);
router.get("/deo-list", dsDeoList);
router.get("/deo-entries", dsDeoEntries);

export default router;
