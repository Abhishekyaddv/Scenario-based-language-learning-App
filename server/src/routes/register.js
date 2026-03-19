import express from 'express'
import { registerUser } from '../controllers/authController.js';

const router = express.Router();


router.get("/register", (req, res) => {
  res.send("Register Page")
})


router.post("/register-user", registerUser);

export default router