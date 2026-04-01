import ScenarioSession from "../models/ScenarioSession.js"
import User from "../models/Users.js";
import { generateScenarioScript, validateUserResponse } from "../services/gemini.js";

export const generateScenario = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    const {situation, language, interests} = req.body;

    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userLevel = user.level;
    const userInterests = user.interests;
    // Always use language from DB — never trust client-sent value
    const userLanguage = user.targetLanguage || 'Spanish';

    const script = await generateScenarioScript({
      situation,
      language: userLanguage,   // DB value, not req.body.language
      level: userLevel,
      interests: userInterests,
    });

    res.status(200).json({ script })

  } catch (error) {
    console.error("generateScenario error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const validateTurn = async (req, res) => {
  try {
    const {aiLine, userResponse, language, level} = req.body;

    const validation = await validateUserResponse({aiLine, userResponse, language, level});
    res.status(200).json({ validation })

  } catch (error) {
    console.error("ValidateTurn error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export const saveSession = async (req, res) => {
  try {
    const userId = req.user.userId;                    // ← declare first
    const user = await User.findById(userId);
    const { scenarioType, language, transcript } = req.body;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // calculate overall score from user turns only
    const scoredTurns = transcript.filter(t => t.score !== null && t.score !== undefined)
    const overallScore = scoredTurns.length > 0
      ? Math.round(scoredTurns.reduce((sum, t) => sum + t.score, 0) / scoredTurns.length)
      : 0

    const xpEarned = Math.round(overallScore / 10)
    const normalizedLevel = typeof user.level === 'string'
      ? user.level.toLowerCase()
      : user.level

    // save session to MongoDB
    const session = await ScenarioSession.create({
      userId,
      scenarioType,
      language,
      level: normalizedLevel,
      transcript,
      overallScore,
      xpEarned,
      completed: true,
    })

    res.status(201).json({ session, xpEarned, overallScore })

  } catch (error) {
    console.error("saveSession error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}