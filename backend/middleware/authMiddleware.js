import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
	let token
	if (
		req.header('Authorization') &&
		req.header('Authorization').startsWith('Bearer')
	) {
		try {
			token = req.header('Authorization').replace('Bearer ', '')
			const decodedPayload = jwt.verify(token, process.env.JWT_SECRET)
			req.user = await User.findById(decodedPayload.id).select('-password')
			next()
		} catch (e) {
			console.error(e)
			res.status(401)
			throw new Error('Not Authorized - Token failed')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not Authorized - No token found!')
	}
})

const isAdmin = ({ user }, res, next) => {
	if (user && user.isAdmin) {
		next()
	} else {
		res.status(401)
		throw new Error('Not authorized as an admin')
	}
}

export { protect, isAdmin }
