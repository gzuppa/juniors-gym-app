import express from 'express'
import {
  addSecondaryTrainer,
  deleteMembers,
  deleteSecondaryTrainer,
  editMember,
  getMember,
  getMembers,
  newMember,
  searchSecondaryTrainer,
} from '../controllers/memberController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.route('/').get(checkAuth, getMembers).post(checkAuth, newMember)
router
  .route('/:id')
  .get(checkAuth, getMember)
  .put(checkAuth, editMember)
  .delete(checkAuth, deleteMembers)
router.post('/trainers', checkAuth, searchSecondaryTrainer)
router.post('/trainers/:id', checkAuth, addSecondaryTrainer)
router.delete('/trainers/:id', checkAuth, deleteSecondaryTrainer)

export default router
