import { Router } from "express";
import * as ctrl from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import {
  validate, signupRules, loginRules, forgotRules, resetRules,
} from "../validators/authValidator.js";

const r = Router();

r.post("/signup", signupRules, validate, ctrl.signup);
r.post("/login", loginRules, validate, ctrl.login);
r.post("/logout", ctrl.logout);
r.get("/me", protect, ctrl.me);
r.post("/forgot-password", forgotRules, validate, ctrl.forgotPassword);
r.post("/reset-password", resetRules, validate, ctrl.resetPassword);

export default r;
