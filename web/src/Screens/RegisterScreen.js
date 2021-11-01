import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import FormContainer from '../Components/FormContainer'
import { register } from '../store/user/userRegisterSlice'
import { useHistory, useLocation } from 'react-router-dom'

const RegisterScreen = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [name, setName] = useState('')
	const [message, setMessage] = useState(null)

	const dispatch = useDispatch()

	const history = useHistory()

	const location = useLocation()

	const redirect = location.search ? location.search.split('=')[1] : '/'

	const { loading, error, userInfo } = useSelector(
		(state) => state.userRegister
	)

	const redirectAfterUserRegisters = useCallback(() => {
		if (userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	useEffect(() => redirectAfterUserRegisters(), [redirectAfterUserRegisters])

	const submitHandler = useCallback(
		(e) => {
			e.preventDefault()
			if (password !== confirmPassword) {
				setMessage('Passwords do not match')
			} else {
				setMessage(null)
				dispatch(register({ name, email, password }))
			}
		},
		[dispatch, email, password, name, confirmPassword]
	)

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{message && <Message variant='danger'>{message}</Message>}
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter your Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter your Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter your Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='confirmpassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Register
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					Have an account?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Login
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen
