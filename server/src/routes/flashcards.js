import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { generateFlashcards, validateFlashcardTurn, saveFlashcardSession, getFlashcardHistory } from '../controllers/flashcardController.js';

const router = express.Router();

router.post('/generate', authMiddleware, generateFlashcards);
router.post('/validate', authMiddleware, validateFlashcardTurn);
router.post('/save', authMiddleware, saveFlashcardSession);
router.get('/history', authMiddleware, getFlashcardHistory);

export default router;
