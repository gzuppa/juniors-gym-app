import express from 'express'
import { check } from 'prettier'
import {
  addMember,
  deleteMember,
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
  .delete(checkAuth, deleteMember)

export default router