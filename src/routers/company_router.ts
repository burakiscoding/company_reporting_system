import { Router } from "express";
import {
  addNewCompanyHandler,
  deleteCompanyHandler,
  getCompaniesHandler,
  getSingleCompanyHandler,
  updateCompanyHandler,
} from "../router_handlers/company_handler";

const router = Router();

router.get("/", getCompaniesHandler);
router.get("/:id", getSingleCompanyHandler);
router.post("/", addNewCompanyHandler);
router.patch("/:id", updateCompanyHandler);
router.delete("/:id", deleteCompanyHandler);

export default router;
