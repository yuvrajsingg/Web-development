import express from 'express'
import contactCtrl from '../controllers/contact.controller.js'
import { requireSignin, isAdmin } from '../middleware/auth.middleware.js'

const router = express.Router()

// Public routes - anyone can read
router.route('/').get(contactCtrl.list)
router.route('/:contactId').get(contactCtrl.read)

// Protected routes - only admin can create/update/delete
router.route('/').post(requireSignin, isAdmin, contactCtrl.create)
router.route('/').delete(requireSignin, isAdmin, contactCtrl.removeMany)
router.param('contactId', contactCtrl.contactByID)
router.route('/:contactId').put(requireSignin, isAdmin, contactCtrl.update)
router.route('/:contactId').delete(requireSignin, isAdmin, contactCtrl.remove)

export default router



