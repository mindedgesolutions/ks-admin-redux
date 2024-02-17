import { Router } from "express";
const router = Router();
import {
  dsApplicationStatusReport,
  dsMigrationStatusReport,
} from "../controllers/admin/reports/dsReportsController.js";

router.get("/ds-application-status-report", dsApplicationStatusReport);
router.get("/ds-migration-status-report", dsMigrationStatusReport);

export default router;
