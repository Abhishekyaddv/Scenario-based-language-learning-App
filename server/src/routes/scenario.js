// routes/scenario.js
import express from 'express'
import { generateScenario, validateTurn, saveSession, getPastScenarios } from '../controllers/scenarioController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/generate', authMiddleware, generateScenario)
router.post('/validate', authMiddleware, validateTurn)
router.post('/save', authMiddleware, saveSession)
router.get('/history', authMiddleware, getPastScenarios)

export default router