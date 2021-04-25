import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

//  @desc Create new Order
//  @route Post /api/orders
//  @access Protected

const addOrderItems = asyncHandler(async ({ user, body }, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice
	} = body

	if (orderItems && orderItems.length === 0) {
		res.status(400)
		throw new Error('No order Items')
	} else {
		const createdOrder = await Order.create({
			orderItems,
			user: user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice
		})
		res.status(201).json(createdOrder)
	}
})

//  @desc  Get Order by ID
//  @route GET /api/orders
//  @access Protected

const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	)

	if (order) {
		res.json(order)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})

//  @desc  Payment Update
//  @route PUT /api/orders/:id/pay
//  @access Protected

const updateOrderPayment = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		order.isPaid = true
		order.paidAt = Date.now()
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address
		}

		const updatedOrder = await order.save()
		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})

//  @desc  Get logged in user orders
//  @route GET /api/orders/myorders
//  @access Protected

const fetchMyOrders = asyncHandler(async ({ user }, res) => {
	const orders = await Order.find({ user: user._id })
	res.json(orders)
})

//  @desc  Get all orders
//  @route GET /api/orders
//  @access Protected/Admin

const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate('user', 'id name email')
	res.json(orders)
})

//  @desc  Delivery Update
//  @route PUT /api/orders/:id/deliver
//  @access Protected Admin

const updateOrderDelivery = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		order.isDelivered = true
		order.deliveredAt = Date.now()

		const updatedOrder = await order.save()
		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})

export {
	addOrderItems,
	getOrderById,
	updateOrderPayment,
	fetchMyOrders,
	getOrders,
	updateOrderDelivery
}
