import { Router } from "express";
import { requestPasswordReset, resetPassword } from "../controllers/resetpassword.controller.js";

const router = Router();

router.post("/requestpasswordreset", requestPasswordReset);
router.post("/resetpassword", resetPassword);

export default router;
