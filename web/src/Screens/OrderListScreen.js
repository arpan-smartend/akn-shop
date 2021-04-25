import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { fetchAllOrders } from '../actions/orderActions'

const OrderListScreen = () => {
	const dispatch = useDispatch()
	const { loading, orders, error } = useSelector(
		(state) => state.orderFetchAllOrders
	)

	useEffect(() => {
		dispatch(fetchAllOrders())
	}, [dispatch])

	const displayOrders = () => {
		if (!orders.length) {
			return <Message>No orders placed yet</Message>
		} else {
			const ordersList = orders.map((order) => (
				<tr key={order._id}>
					<td>{order._id}</td>
					<td>
						<Row>
							<Col md={12}>{order?.user?.name}</Col>
						</Row>
						<Row>
							<Col md={12}>
								<a href={`mailto:${order?.user?.email}`}>
									{order?.user?.email}
								</a>
							</Col>
						</Row>
					</td>
					<td>{order?.createdAt?.substring(0, 10)}</td>
					<td>&#x20B9; {order.totalPrice.toFixed(2)}</td>
					<td>
						{order.isPaid ? (
							<Message variant='success'>
								{order?.paidAt?.substring(0, 10)}
							</Message>
						) : (
							<i className='fas fa-times' style={{ color: 'red' }}></i>
						)}
					</td>
					<td>
						{order.isDelivered ? (
							<Message variant='success'>
								{order?.deliveredAt?.substring(0, 10)}
							</Message>
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
							<th>User</th>
							<th>Date</th>
							<th>Total</th>
							<th>Paid</th>
							<th>Delivered</th>
							<th></th>
						</tr>
					</thead>
					<tbody>{ordersList}</tbody>
				</Table>
			)
		}
	}

	return (
		<>
			<h1>Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				displayOrders()
			)}
		</>
	)
}

export default OrderListScreen
