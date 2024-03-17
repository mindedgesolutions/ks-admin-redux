import { Router } from "express";
const router = Router();
import {
  dsApplicationStatusReport,
  dsApplicationStatusReportAll,
  dsMigrationStatusReport,
} from "../controllers/admin/reports/dsReportsController.js";

router.get("/ds-application-status", dsApplicationStatusReport);
router.get("/ds-application-status-all", dsApplicationStatusReportAll);
router.get("/ds-migration-status-report", dsMigrationStatusReport);

export default router;
