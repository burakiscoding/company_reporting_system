import { Router } from "express";
import {
  addNewReportHandler,
  deleteReportHandler,
  getReportsByCompanyIdHandler,
  getReportsByUserIdHandler,
  getReportsHandler,
} from "../router_handlers/report_handler";
import { authenticationMiddleware } from "../middlewares/middleware";

const router = Router();

router.get("/", getReportsHandler);
router.get("/company/:id", getReportsByCompanyIdHandler);
router.get("/user", authenticationMiddleware, getReportsByUserIdHandler);
router.post("/", authenticationMiddleware, addNewReportHandler);
router.delete("/:id", authenticationMiddleware, deleteReportHandler);

export default router;
