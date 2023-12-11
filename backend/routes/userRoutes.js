import express from 'express'
import {
  authenticate,
  confirm,
  confirmToken,
  forgotPassword,
  newPassword,
  registerUser,
} from '../controllers/userController.js'

const router = express.Router()

// Create, register and user confirmation
router.post('/', registerUser)
router.post('/login', authenticate)
router.get('/confirm/:token', confirm)
router.post('/forgot-password', forgotPassword)
router.route('/forgot-password/:token').get(confirmToken).post(newPassword)

export default router
