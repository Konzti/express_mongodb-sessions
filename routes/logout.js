import { Router } from "express";
import { authGuard } from "../middleware/auth.js";
import { logoutHandler } from '../handlers/logout.js';


const router = Router();

router.get("/", authGuard, logoutHandler);

export default router;