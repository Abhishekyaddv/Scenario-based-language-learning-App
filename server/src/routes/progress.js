import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getProgress,
  updateProgress,
} from "../controllers/progressController.js";

const router = express.Router();

router.get("/", authMiddleware, getProgress);
router.post("/update", authMiddleware, updateProgress);

export default router;