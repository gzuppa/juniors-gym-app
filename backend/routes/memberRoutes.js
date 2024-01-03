import express from 'express'
import {
  addSecondaryTrainer,
  deleteMembers,
  deleteSecondaryTrainer,
  editMember,
  getMember,
  getMembers,
  newMember,
} from '../controllers/memberController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.route('/').get(checkAuth, getMembers).post(checkAuth, newMember)
router
  .route('/:id')
  .get(checkAuth, getMember)
  .put(checkAuth, editMember)
  .delete(checkAuth, deleteMembers)
router.post('/add-secondary-trainer/:id', checkAuth, addSecondaryTrainer)
router.post('/delete-secondary-trainer/:id', checkAuth, deleteSecondaryTrainer)

export default router
