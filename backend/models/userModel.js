import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is a mandatory field'],
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Email is a mandatory field'],
			lowercase: true,
			trim: true,
			unique: true,
			validate: {
				validator: (value) => {
					return validator.isEmail(value)
				},
				message: ({ value }) => {
					return `${value} is an invalid email`
				},
			},
		},
		password: {
			type: String,
			required: [true, 'Password is a mandatory field'],
			trim: true,
			minlength: [5, 'Password must be greater than 5 chars'],
			validate: [
				{
					validator: (value) => {
						return !(value.toLowerCase() === 'password')
					},
					message: ({ path, value }) => {
						return `${path}: cannot be equal to ${value}`
					},
				},
				{
					validator: (value) => {
						return !value.toLowerCase().includes('password')
					},
					message: ({ value }) => {
						return `${value}: cannot contain the word passord`
					},
				},
			],
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
)

userSchema.methods.matchPassword = async function (enteredPassword) {
	return bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
	const user = this

	if (!user.isModified('password')) {
		next()
	}
	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(user.password, salt)
	next()
})

const User = mongoose.model('User', userSchema)
export default User
