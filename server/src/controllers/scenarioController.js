import ScenarioSession from "../models/ScenarioSession.js"
import User from "../models/Users.js";
import { generateScenarioScript } from "../services/gemini.js";

export const generateScenario = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {situation, language, interests} = req.body;

     const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userLevel = user.level; 
    const userInterest = user.interests;

    const script = await generateScenarioScript({ situation, language, interests, userLevel,userInterest });
    res.status(200).json({ script })

  } catch (error) {
    console.error("generateScenario error:", error);
  res.status(500).json({ message: "Internal server error" });
  }
}

export const validateTurn = async (req, res) => {
  try {
    const {aiLine, userResponse, language, level} = req.body;
  } catch (error) {
    
  }
}
export const saveSession = async (req, res) => {
  
}