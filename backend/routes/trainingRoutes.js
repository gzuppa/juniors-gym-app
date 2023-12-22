import express from 'express'
import {
  addTraining,
  changeTrainingStatus,
  deleteTraining,
  getTraining,
  updateTraining
} from '../controllers/trainingController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.post('/', checkAuth, addTraining)
router.route('/:id').get(checkAuth, getTraining).put(checkAuth, updateTraining).delete(checkAuth, deleteTraining)
router.post('/status/:id', checkAuth, changeTrainingStatus)

export default router