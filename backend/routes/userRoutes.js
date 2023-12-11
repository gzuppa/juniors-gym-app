import express from 'express'
import {
  authenticate,
  confirm,
  registerUser,
} from '../controllers/userController.js'

const router = express.Router()

// Create, register and user confirmation
router.post('/', registerUser)
router.post('/login', authenticate)
router.get('/confirm/:token', confirm)

export default router
