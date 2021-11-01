import React, { useState, useEffect, useCallback } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { fetchMyOrders } from '../store/order/orderFetchMyOrdersSlice'
import { useHistory } from 'react-router-dom'
import { userDetails } from '../store/user/userDetailsSlice'
import {
	updateUserProfile,
	updateProfileReset
} from '../store/user/userUpdateProfileSlice'

const ProfileScreen = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [name, setName] = useState('')
	const [message, setMessage] = useState(null)

	const dispatch = useDispatch()
	const history = useHistory()

	const { loading, error, user } = useSelector((state) => state.userDetails)

	const { userInfo } = useSelector((state) => state.userLogin)

	const { success } = useSelector((state) => state.userUpdateProfile)

	const {
		loading: fetchMyOrdersLoading,
		orders,
		error: fetchMyOrdersError
	} = useSelector((state) => state.orderFetchMyOrders)

	const redirectIfUserNotLoggedIn = useCallback(() => {
		if (!userInfo) {
			history.push('/login')
		} else {
			if (!user || success) {
				dispatch(userDetails('profile'))
				dispatch(updateProfileReset())
			} else {
				setName(user.name)
				setEmail(user.email)
			}
		}
	}, [history, userInfo, dispatch, user, success])

	useEffect(() => redirectIfUserNotLoggedIn(), [redirectIfUserNotLoggedIn])
	useEffect(() => userInfo && dispatch(fetchMyOrders()), [userInfo, dispatch])

	const submitHandler = useCallback(
		(e) => {
			e.preventDefault()
			if (password !== confirmPassword) {
				setMessage('Passwords do not match')
			} else {
				setMessage(null)
				dispatch(
					updateUserProfile({
						id: user._id,
						name,
						email,
						password
					})
				)
			}
		},
		[password, confirmPassword, dispatch, email, name, user]
	)

	const displayMyOrders = () => {
		if (!orders.length) {
			return (
				<Message>
					No orders placed <Link to='/'>Continue Shopping</Link>
				</Message>
			)
		} else {
			const ordersTable = orders.map((order) => (
				<tr key={order?._id}>
					<td>{order?._id}</td>
					<td>{order?.createdAt.substring(0, 10)}</td>
					<td>{order?.totalPrice}</td>
					<td>
						{order?.isPaid ? (
							order?.paidAt.substring(0, 10)
						) : (
							<i className='fas fa-times' style={{ color: ' red ' }}></i>
						)}
					</td>
					<td>
						{order?.isDelivered ? (
							order?.deliveredAt.substring(0, 10)
						) : (
							<i className='fas fa-times' style={{ color: 'red' }}></i>
						)}
					</td>
					<td>
						<LinkContainer to={`/order/${order._id}`}>
							<Button variant='light' className='btn-sm'>
								Details
							</Button>
						</LinkContainer>
					</td>
				</tr>
			))

			return (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Date</th>
							<th>Total</th>
							<th>Paid</th>
							<th>Status</th>
							<th></th>
						</tr>
					</thead>
					<tbody>{ordersTable}</tbody>
				</Table>
			)
		}
	}

	return (
		<Row>
			<Col md={3}>
				<h2>My Profile</h2>
				{message && <Message variant='danger'>{message}</Message>}
				{success && (
					<Message variant='success'>Profile Updated Successfully</Message>
				)}
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
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
				{fetchMyOrdersLoading ? (
					<Loader />
				) : fetchMyOrdersError ? (
					<Message variant='danger'>{fetchMyOrdersError}</Message>
				) : (
					displayMyOrders()
				)}
			</Col>
		</Row>
	)
}

export default ProfileScreen
