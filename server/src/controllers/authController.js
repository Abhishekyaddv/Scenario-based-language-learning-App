import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ── Basic validation ──
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    // ── Check if user already exists ──
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    // ── Hash the password ──
    const passwordHash = await bcrypt.hash(password, 10);

    // ── Create and save user ──
    const newUser = new User({
      name,
      email,
      passwordHash,
    });

    await newUser.save();

    // ── Generate JWT ──
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ── Respond ──
    res.status(201).json({
      message: "User registered successfully.",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isOnboarded: newUser.isOnboarded,
      },
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const loginUser = async (req, res) => {

   try {
    const {email, password} = req.body;

    // Validation 
    if(!email || !password){
      return res.status(400).json({message: "Email and password are required"})
    }

    // -Check if user exists or not
    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({message: "User does not exist please signup for new account"})
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if(!isMatch){
      return res.status(400).json({message: "Email or password is incorrect, please try again"})
    }

    // Generate JWT
    const token = jwt.sign(
      {userId: user._id, email: user.email},
      process.env.JWT_SECRET,
      {expiresIn: '7d'}
    )

    res.status(200).json({
      message: "Login Succesful",
      token, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isOnboarded: user.isOnboarded,
        level: user.level,
        targetLanguage: user.targetLanguage,
      }
    })

  } catch (error) {
    response.status(500).send({ error });
    res.status(500).json({ message: "Internal server error." });
  }
}

export const onboardingUser = async (req, res) => {

  try {
    
  } catch (error) {
    
  }
}