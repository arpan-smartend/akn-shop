import React, { useState, useEffect, useCallback } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import CheckoutSteps from '../Components/CheckoutSteps'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { createOrder, resetOrderState } from '../actions/orderActions'
import { useHistory } from 'react-router-dom'

const PlaceOrderScreen = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const [resetState, setResetState] = useState(false)

	const {
		cartItems,
		shippingAddress: { address, city, postalCode, country },
		paymentMethod
	} = useSelector((state) => state.cart)

	const { loading, success, order, error } = useSelector(
		(state) => state.orderCreate
	)

	const resetOrderStateOnLoad = useCallback(() => {
		dispatch(resetOrderState())
		setResetState(true)
	}, [dispatch])

	const routeOnSuccess = useCallback(() => {
		if (success) {
			history.push(`/order/${order._id}`)
		}
	}, [history, success, order])

	useEffect(() => {
		resetOrderStateOnLoad()
	}, [resetOrderStateOnLoad])

	useEffect(() => {
		resetState && routeOnSuccess()
	}, [routeOnSuccess, resetState])

	//calculate prices
	const itemsPrice = Number(
		cartItems.reduce(
			(acc, currentItem) => acc + currentItem.price * currentItem.qty,
			0
		)
	)

	const shippingPrice = itemsPrice > 30000 ? 0 : Number(0.02 * itemsPrice)

	const taxPrice = Number((0.15 * itemsPrice).toFixed(2))

	const totalPrice = Number(itemsPrice + shippingPrice + taxPrice)

	const displayOrderedItems = () => {
		if (!cartItems.length) {
			return (
				<Message>
					Your cart is empty <Link to='/'>Continue Shopping</Link>
				</Message>
			)
		} else {
			const orderedItems = cartItems.map((item) => (
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
	const placeOrderHandler = useCallback(() => {
		dispatch(
			createOrder({
				orderItems: cartItems,
				shippingAddress: { address, city, postalCode, country },
				paymentMethod,
				itemsPrice,
				taxPrice,
				shippingPrice,
				totalPrice
			})
		)
	}, [
		dispatch,
		cartItems,
		address,
		city,
		postalCode,
		country,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice
	])

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<span className='font-weight-bold'>Address:</span>&nbsp;
								{address}, {city}, {postalCode}, {country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<span className='font-weight-bold'>Method:</span>&nbsp;
								{paymentMethod}
							</p>
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
									<Col>&#x20B9; {itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>&#x20B9; {shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>&#x20B9; {taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>&#x20B9; {totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{error && (
								<ListGroup.Item>
									<Message variant='danger'>{error}</Message>
								</ListGroup.Item>
							)}
							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block'
									disabled={!cartItems.length}
									onClick={placeOrderHandler}
								>
									{loading ? <Loader buttonLoader /> : 'Place Order'}
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default PlaceOrderScreen
