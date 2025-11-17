import express from 'express'
import servicesCtrl from '../controllers/services.controller.js'
import { requireSignin, isAdmin } from '../middleware/auth.middleware.js'

const router = express.Router()

// Public routes - anyone can read
router.route('/').get(servicesCtrl.list)
router.route('/:serviceId').get(servicesCtrl.read)

// Protected routes - anyone logged in can create, only admin can update/delete
router.route('/').post(requireSignin, servicesCtrl.create)
router.param('serviceId', servicesCtrl.serviceByID)
router.route('/:serviceId').put(requireSignin, isAdmin, servicesCtrl.update)
router.route('/:serviceId').delete(requireSignin, isAdmin, servicesCtrl.remove)

export default router
