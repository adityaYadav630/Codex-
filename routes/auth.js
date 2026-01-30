import express from "express";
const router = express.Router();
import { auth } from "../middleware/auth.js";
import * as authController from "../controllers/authController.js";
router.get("/auth/check", (req, res) => {
  res.json({ loggedIn: !!req.session.userId });
});

router.get("/login", authController.loginPage);
router.post("/login", authController.login);

router.get("/register", authController.registerPage);
router.post("/register", authController.register);

router.get("/logout", authController.logout);

export const authRoutes = router;
