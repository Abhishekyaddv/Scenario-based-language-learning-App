import express, { Router } from "express";
import authMiddleware from '../middleware/authMiddleware.js'
import { updateProfile } from '../controllers/authController.js'

const router = express.Router();

router.patch("/update-profile", authMiddleware, updateProfile)

export default router