// routes/scenario.js
import express from 'express'
import { generateScenario, validateTurn, saveSession } from '../controllers/scenarioController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/generate', authMiddleware, generateScenario)
router.post('/validate', authMiddleware, validateTurn)
router.post('/save', authMiddleware, saveSession)

export default router