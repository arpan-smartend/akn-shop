import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useHistory, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../Components/Message'
import { addToCart, removeFromCart } from '../store/cart/cartSlice'

const CartScreen = () => {
	const { id: productId } = useParams()
	const { search } = useLocation()
	const qty = search ? Number(search.split('=')[1]) : 1
	const history = useHistory()
	const dispatch = useDispatch()
	const { cartItems } = useSelector((state) => state.cart)

	const addToCartAction = useCallback(() => {
		if (productId) {
			dispatch(addToCart({ id: productId, qty }))
		}
	}, [dispatch, productId, qty])

	useEffect(() => {
		addToCartAction()
	}, [addToCartAction])

	const removeProductHandler = useCallback(
		(productId) => {
			dispatch(removeFromCart(productId))
		},
		[dispatch]
	)

	const checkoutHandler = useCallback(() => {
		history.push('/login?redirect=shipping')
	}, [history])

	const displayItems = () => {
		if (!cartItems.length) {
			return (
				<Message>
					Your cart is empty <Link to='/'>Continue Shopping</Link>
				</Message>
			)
		} else {
			const cartItemsList = cartItems.map((item) => (
				<ListGroup.Item key={item.product}>
					<Row>
						<Col md={2}>
							<Image src={item.image} alt={item.name} fluid rounded />
						</Col>
						<Col md={3}>
							<Link to={`/product/${item.product}`}>{item.name}</Link>
						</Col>
						<Col md={2}>&#x20B9;{item.price}</Col>
						<Col md={2}>
							<Form.Control
								as='select'
								value={item.qty}
								onChange={(e) =>
									dispatch(
										addToCart({ id: item.product, qty: Number(e.target.value) })
									)
								}
							>
								{[...Array(item.countInStock).keys()].map((item) => (
									<option key={item + 1} value={item + 1}>
										{item + 1}
									</option>
								))}
							</Form.Control>
						</Col>
						<Col md={2}>
							<Button
								type='button'
								variant='light'
								onClick={() => removeProductHandler(item.product)}
							>
								<i className='fas fa-trash'></i>
							</Button>
						</Col>
					</Row>
				</ListGroup.Item>
			))
			return <ListGroup variant='flush'>{cartItemsList}</ListGroup>
		}
	}

	const displayCartSummary = () => {
		if (!cartItems.length) {
			return
		}
		const totalItems = cartItems.reduce(
			(acc, currentItem) => acc + currentItem.qty,
			0
		)
		const totalPrice = cartItems
			.reduce(
				(acc, currentItem) => acc + currentItem.qty * currentItem.price,
				0
			)
			.toFixed(2)
		return (
			<Card>
				<ListGroup variant='flush'>
					<ListGroup.Item>
						<h2>Subtotal ({totalItems}) items</h2>
						<p>{totalPrice}</p>
					</ListGroup.Item>
					<ListGroup.Item>
						<Button
							type='button'
							className='btn-block'
							disabled={cartItems.length === 0}
							onClick={checkoutHandler}
						>
							Proceed To Checkout
						</Button>
					</ListGroup.Item>
				</ListGroup>
			</Card>
		)
	}
	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{displayItems()}
			</Col>
			<Col md={4}>{displayCartSummary()}</Col>
		</Row>
	)
}

export default CartScreen
