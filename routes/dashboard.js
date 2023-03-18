import { Router } from "express";
import { authGuard } from "../middleware/auth.js";


const router = Router();

router.get("/", authGuard, (req, res) => {
    res.render("dashboard", { title: "Dashboard", user: req.session.user });
});

export default router;