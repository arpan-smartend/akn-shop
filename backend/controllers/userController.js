import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateAuthToken from '../utils/generateToken.js'

// @desc    Auth user & get a token
// @route   POST/api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateAuthToken(user._id)
		})
	} else {
		res.status(401)
		throw new Error('Invalid Email or Password')
	}
})

// @desc    Register a user
// @route   POST/api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body
	const doesUserExists = await User.findOne({ email })

	if (doesUserExists) {
		res.status(400)
		throw new Error('User already exists')
	}
	const user = await User.create({ name, email, password })

	if (!user) {
		res.status(400)
		throw new Error('Invalid User Data')
	} else {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateAuthToken(user._id)
		})
	}
})

// @desc    Get user profile
// @route   Get /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async ({ user }, res) => {
	if (!user) {
		res.status(404)
		throw new Error('User not found')
	}
	res.json({
		_id: user._id,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin
	})
})
// @desc    Get all users
// @route   Get /api/users
// @access  Private/admin

const getUsers = asyncHandler(async ({ user }, res) => {
	const users = await User.find({})
	res.json(users)
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async ({ user, body }, res) => {
	if (!user) {
		res.status(404)
		throw new Error('User not found')
	}
	user.name = body.name ?? user.name
	user.email = body.email ?? user.email
	body.password && (user.password = body.password)

	const updatedUser = await user.save()

	res.json({
		_id: updatedUser._id,
		name: updatedUser.name,
		email: updatedUser.email,
		isAdmin: updatedUser.isAdmin,
		token: generateAuthToken(updatedUser._id)
	})
})

// @desc    Delete a user profile
// @route   DELETE /api/users/:id
// @access  Private Admin

const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)

	if (user) {
		await user.remove()
		res.json({ message: 'User removed' })
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

// @desc    Get user by id
// @route   Get /api/users/:id
// @access  Private/admin

const getUserById = asyncHandler(async ({ params }, res) => {
	const user = await User.findById(params.id).select('-password')
	if (!user) {
		res.status(404)
		throw new Error('User not found')
	}
	res.json(user)
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin

const updateUser = asyncHandler(async ({ params, body }, res) => {
	const user = await User.findById(params.id)

	if (!user) {
		res.status(404)
		throw new Error('User not found')
	}

	user.name = body.name ?? user.name
	user.email = body.email ?? user.email
	user.isAdmin = body.isAdmin

	const updatedUser = await user.save()

	res.json({
		_id: updatedUser._id,
		name: updatedUser.name,
		email: updatedUser.email,
		isAdmin: updatedUser.isAdmin
	})
})

export {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser
}
