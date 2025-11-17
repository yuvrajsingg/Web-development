import express from 'express'
import qualificationCtrl from '../controllers/education.controller.js'
import { requireSignin, isAdmin } from '../middleware/auth.middleware.js'

const router = express.Router()

// Public routes - anyone can read
router.route('/').get(qualificationCtrl.list)
router.route('/:qualificationId').get(qualificationCtrl.read)

// Protected routes - only admin can create/update/delete
router.route('/').post(requireSignin, isAdmin, qualificationCtrl.create)
router.route('/').delete(requireSignin, isAdmin, qualificationCtrl.removeMany)
router.param('qualificationId', qualificationCtrl.qualificationByID)
router.route('/:qualificationId').put(requireSignin, isAdmin, qualificationCtrl.update)
router.route('/:qualificationId').delete(requireSignin, isAdmin, qualificationCtrl.remove)

export default router



