import express from "express";
import * as authRoute from "../controllers/auth.js"
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.get("/profile", verifyToken, authRoute.profile);

router.post("/login", authRoute.login);

router.post("/register", authRoute.register);

router.post("/logout", authRoute.logout);

export default router;