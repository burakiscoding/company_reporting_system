import { Router } from "express";
import { loginHandler, registerHandler } from "../router_handlers/auth_handler";

const router = Router();

router.post("/login", loginHandler);
router.post("/register", registerHandler);

export default router;
