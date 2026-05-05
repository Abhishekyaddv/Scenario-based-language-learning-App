import FlashcardSession from "../models/FlashcardSession.js";
import User from "../models/Users.js";
import { generateFlashcardsScript, validateFlashcardAnswer } from "../services/gemini.js";

export const generateFlashcards = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    const { topic } = req.body;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.credits <= 0) {
      return res.status(403).json({ message: "You have run out of free credits." });
    }

    const userLevel = user.level;
    const userLanguage = user.targetLanguage || 'Spanish';

    let result;
    try {
      result = await generateFlashcardsScript({
        topic,
        language: userLanguage,
        level: userLevel,
      });
    } catch (apiError) {
      console.warn("AI API failed, falling back to mock flashcards. Error:", apiError.message);
      result = {
        flashcards: [
          { question: `Mock card for: ${topic} (1)`, answer: "Traducción de prueba 1" },
          { question: `Mock card for: ${topic} (2)`, answer: "Traducción de prueba 2" },
          { question: "Hello", answer: "Hola" },
          { question: "Thank you", answer: "Gracias" },
          { question: "Goodbye", answer: "Adiós" }
        ]
      };
    }

    user.credits -= 1;
    await user.save();

    res.status(200).json({ flashcards: result.flashcards, credits: user.credits });

  } catch (error) {
    console.error("generateFlashcards error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const validateFlashcardTurn = async (req, res) => {
  try {
    const { question, expectedAnswer, userAnswer, language, level } = req.body;

    let validation;
    try {
      validation = await validateFlashcardAnswer({ question, expectedAnswer, userAnswer, language, level });
    } catch (apiError) {
      console.warn("AI Validation failed, using fallback logic. Error:", apiError.message);
      // simple string matching fallback
      const correct = userAnswer.toLowerCase().trim() === expectedAnswer.toLowerCase().trim();
      validation = {
        correct: correct,
        score: correct ? 100 : 0,
        feedback: correct ? "Perfect! (Fallback Match)" : "Not quite. (Fallback Match)"
      };
    }

    res.status(200).json({ validation });

  } catch (error) {
    console.error("validateFlashcardTurn error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const saveFlashcardSession = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    const { topic, language, cards } = req.body;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const scoredCards = cards.filter(c => c.score !== null && c.score !== undefined);
    const overallScore = scoredCards.length > 0
      ? Math.round(scoredCards.reduce((sum, c) => sum + c.score, 0) / scoredCards.length)
      : 0;

    const xpEarned = Math.round(overallScore / 10);
    const normalizedLevel = typeof user.level === 'string' ? user.level.toLowerCase() : user.level;

    const session = await FlashcardSession.create({
      userId,
      topic,
      language,
      level: normalizedLevel,
      cards,
      overallScore,
      xpEarned,
      completed: true,
    });

    res.status(201).json({ session, xpEarned, overallScore });

  } catch (error) {
    console.error("saveFlashcardSession error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFlashcardHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const sessions = await FlashcardSession.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(sessions);
  } catch (error) {
    console.error("getFlashcardHistory error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
