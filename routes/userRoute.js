import express from "express";
import {
  loginUser,
  registerUser,
  updateInfo,
} from "../controllers/userControllers.js";

import {protect} from '../middlewars/auth.js'

const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/login", loginUser);
router.post("/update", protect, updateInfo);


export default router;
  