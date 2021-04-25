import jwt from 'jsonwebtoken'

const generateAuthToken = (id) =>
	jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '1d',
	})

export default generateAuthToken
