import express from 'express'
import { registerUser } from '../controllers/userController.js'

const router = express.Router()

// Create, register and user confirmation
router.post('/', registerUser)

export default router
