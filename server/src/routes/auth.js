// routes/auth.js
import express from 'express'
import { registerUser, loginUser, updateProfile } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register-user', registerUser)
router.post('/login-user', loginUser)
router.patch('/update-profile', authMiddleware, updateProfile)
// router.get('/me', authMiddleware, getMe)

export default router