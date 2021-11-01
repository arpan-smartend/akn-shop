import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import FormContainer from '../Components/FormContainer'
import { login } from '../store/user/userLoginSlice'
import { useLocation, useHistory } from 'react-router-dom'

const LoginScreen = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const location = useLocation()
	const history = useHistory()
	const redirect = location.search ? location.search.split('=')[1] : '/'

	const { loading, error, userInfo } = useSelector((state) => state.userLogin)
	const redirectIfUserLoggedIn = useCallback(() => {
		if (userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	useEffect(() => redirectIfUserLoggedIn(), [redirectIfUserLoggedIn])

	const submitHandler = useCallback(
		(e) => {
			e.preventDefault()
			dispatch(login({ email, password }))
		},
		[dispatch, email, password]
	)

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
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
				<Button type='submit' variant='primary'>
					Sign In
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					New to AKNShop?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default LoginScreen
