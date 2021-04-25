import express from 'express'
const router = express.Router()

import {
	addOrderItems,
	fetchMyOrders,
	getOrderById,
	updateOrderPayment,
	getOrders,
	updateOrderDelivery
} from '../controllers/orderController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrders)
router.route('/myorders').get(protect, fetchMyOrders)

// put this route at the bottom, otherwise it will match anything that comes with /order/anyReq
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderPayment)
router.route('/:id/deliver').put(protect, updateOrderDelivery)
export default router
