import React, { useState, useEffect } from 'react'
import {
	Row,
	Col,
	ListGroup,
	Image,
	Card,
	Button,
	Alert
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { getOrderDetails } from '../store/order/orderDetailsSlice'
import { useParams } from 'react-router-dom'
import { payOrder, resetPaymentState } from '../store/order/orderPaySlice'
import {
	deliverOrder,
	resetDeliveryState
} from '../store/order/orderDeliverSlice'

const OrderScreen = () => {
	const { id } = useParams()
	const [showAlert, setShowAlert] = useState(false)

	const dispatch = useDispatch()

	const { loading, order, error } = useSelector((state) => state.orderDetails)

	const { loading: payLoading, success: paySuccess } = useSelector(
		(state) => state.orderPay
	)

	const { loading: deliverLoading } = useSelector((state) => state.orderDeliver)

	const { userInfo } = useSelector((state) => state.userLogin)

	useEffect(() => {
		if (!order || order._id !== id) {
			setShowAlert(false)
			dispatch(resetPaymentState())
			dispatch(resetDeliveryState())
			dispatch(getOrderDetails(id))
		}
	}, [dispatch, id, order])

	useEffect(() => {
		let timeOut
		if (paySuccess) {
			setShowAlert(true)
			timeOut = setTimeout(() => {
				console.log('start set timeout')
				setShowAlert(false)
			}, 3000)
		} else {
			setShowAlert(false)
		}

		return () => {
			if (timeOut) {
				console.log('clear time out')
				clearTimeout(timeOut)
			}
		}
	}, [paySuccess])

	const displayOrderedItems = () => {
		if (!order?.orderItems?.length) {
			return (
				<Message>
					Order is empty <Link to='/'>Continue Shopping</Link>
				</Message>
			)
		} else {
			const orderedItems = order?.orderItems.map((item) => (
				<ListGroup.Item key={item.product}>
					<Row>
						<Col md={3}>
							<Image src={item.image} alt={item.name} fluid rounded />
						</Col>
						<Col>
							<Link to={`/product/${item.product}`}>{item.name}</Link>
						</Col>
						<Col md={4}>
							{item.qty} units * &#x20B9;{item.price} = &#x20B9;
							{item.qty * item.price}
						</Col>
					</Row>
				</ListGroup.Item>
			))
			return orderedItems
		}
	}

	const proceedToPayHandler = () => {
		dispatch(payOrder(id))
	}

	const deliverHandler = () => {
		dispatch(deliverOrder(id))
	}

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<>
			{userInfo.isAdmin && (
				<Link to='/admin/orderlist' className='btn btn-light my-3'>
					Go Back
				</Link>
			)}

			{showAlert && (
				<Alert variant='success'>
					<Alert.Heading>Payment Successful</Alert.Heading>
					<p>Order Placed Successfully</p>
				</Alert>
			)}
			<h1>Order {order?._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Name: </strong> {order?.user?.name}
							</p>
							<p>
								<strong>Email: </strong>
								<a href={`mailto:${order?.user?.email}`}>
									{order?.user?.email}
								</a>
							</p>
							<p>
								<span className='font-weight-bold'>Address:</span>&nbsp;
								{order?.shippingAddress?.address},{' '}
								{order?.shippingAddress?.city},{' '}
								{order?.shippingAddress?.postalCode},{' '}
								{order?.shippingAddress?.country}
							</p>
							{order?.isDelivered ? (
								<Message variant='success'>
									Order deliverd on {order?.deliveredAt}
								</Message>
							) : (
								<Message variant='danger'>Not yet Delivered</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method:</strong>
								{order?.paymentMethod}
							</p>
							{order?.isPaid ? (
								<Message variant='success'>Paid on {order?.paidAt}</Message>
							) : (
								<Message variant='danger'>Not Paid</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<ListGroup variant='flush'>
								<h2>Order Items</h2>
								{displayOrderedItems()}
							</ListGroup>
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>&#x20B9; {order?.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>&#x20B9; {order?.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>&#x20B9; {order?.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>&#x20B9; {order?.totalPrice?.toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{order?.isPaid ? (
									<Message variant='success'>Payment Successful</Message>
								) : (
									<Button
										type='button'
										className='btn-block'
										onClick={proceedToPayHandler}
									>
										{payLoading ? (
											<Loader buttonLoader />
										) : (
											`Proceed To Pay  \u20B9 ${order?.totalPrice}`
										)}
									</Button>
								)}
							</ListGroup.Item>

							{userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
								<ListGroup.Item>
									<Button
										type='button'
										className='btn btn-block'
										onClick={deliverHandler}
									>
										{deliverLoading ? (
											<Loader buttonLoader />
										) : (
											'Mark as Delivered'
										)}
									</Button>
								</ListGroup.Item>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default OrderScreen
