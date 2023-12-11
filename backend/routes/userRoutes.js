import express from 'express'
import { authenticate, registerUser } from '../controllers/userController.js'

const router = express.Router()

// Create, register and user confirmation
router.post('/', registerUser)
router.post('/login', authenticate)

export default router
