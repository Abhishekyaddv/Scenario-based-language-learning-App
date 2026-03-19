// src/routes/user.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/Users.js";

const router = express.Router();

// this route is protected — only logged in users can access it
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // req.user.userId comes from the decoded JWT token
    const user = await User.findById(req.user.userId).select("-passwordHash");

    if (!user)
      return res.status(404).json({ message: "User not found." });

    res.status(200).json({ user });

  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;