import React, { useState, useEffect, useCallback } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
	FormGroup,
	FormLabel,
	FormControl
} from 'react-bootstrap'
import Rating from '../Components/Rating'
import {
	listProductDetail,
	createProductReview,
	createReviewReset
} from '../actions/productActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'

const ProductScreen = () => {
	const [qty, setQty] = useState(1)
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')

	const { id } = useParams()
	const history = useHistory()
	const dispatch = useDispatch()

	const fetchProductDetail = useCallback(
		() => dispatch(listProductDetail(id)),
		[dispatch, id]
	)

	const { userInfo } = useSelector((state) => state.userLogin)

	const { loading, product, error } = useSelector(
		(state) => state.productDetails
	)

	const { loading: crLoading, message, success, error: crError } = useSelector(
		(state) => state.productCreateReview
	)

	useEffect(() => {
		fetchProductDetail()
		return () => {
			dispatch(createReviewReset())
		}
	}, [fetchProductDetail, dispatch])

	useEffect(() => {
		if (success) {
			dispatch(createReviewReset())
			setRating(0)
			setComment('')
			fetchProductDetail()
		}
	}, [fetchProductDetail, success, dispatch])

	const changeQtyHandler = (event) => {
		setQty(event.target.value)
	}

	const addToCartHandler = (event) => {
		event.preventDefault()
		history.push({
			pathname: `/cart/${id}`,
			search: `?qty=${qty}`
		})
	}

	const displayReviews = () => {
		if (!product?.reviews?.length) {
			return <Message>No reviews yet for this product</Message>
		} else {
			const reviews = product.reviews.map((item) => (
				<ListGroup.Item key={item._id}>
					<strong>{item?.user?.name}</strong>
					<Rating value={item?.rating}></Rating>
					<p>{item?.createdAt?.substring(0, 10)}</p>
					<p>{item?.comment}</p>
				</ListGroup.Item>
			))

			return reviews
		}
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(createProductReview(id, { rating, comment }))
	}

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						<Col md={6}>
							<Image src={product?.image} alt={product?.name} fluid />
						</Col>
						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product?.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product?.rating}
										text={`${product?.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>
									Price: &#x20B9; {product?.price}
								</ListGroup.Item>
								<ListGroup.Item>
									Description: {product?.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col>
												<strong> &#x20B9; {product?.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												{product?.countInStock > 0
													? 'In Stock'
													: 'Out of Stock'}
											</Col>
										</Row>
									</ListGroup.Item>

									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col>
													<Form.Control
														as='select'
														value={qty}
														onChange={changeQtyHandler}
													>
														{[...Array(product?.countInStock).keys()].map(
															(item) => (
																<option key={item + 1} value={item + 1}>
																	{item + 1}
																</option>
															)
														)}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										<Button
											onClick={addToCartHandler}
											className='btn-block'
											type='button'
											disabled={product?.countInStock === 0}
										>
											Add to Cart
											{crLoading && <Loader buttonLoader />}
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							<ListGroup variant='flush'>
								{displayReviews()}
								<ListGroup.Item>
									<h2>Share your review for this product</h2>
									{crError && <Message variant='danger'>{crError}</Message>}
									{success && <Message variant='success'>{message}</Message>}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<FormGroup controlId='rating'>
												<FormLabel>Rating</FormLabel>
												<FormControl
													as='select'
													value={rating}
													onChange={(e) => setRating(e.target.value)}
												>
													<option value=''>Select...</option>
													<option value='1'>1 - Poor</option>
													<option value='2'>2 - Fair</option>
													<option value='3'>3 - Good</option>
													<option value='4'>4 - Very Good</option>
													<option value='5'>5 - Excellent</option>
												</FormControl>
											</FormGroup>
											<FormGroup controlId='comment'>
												<FormLabel>Comment</FormLabel>
												<FormControl
													as='textarea'
													row='3'
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												></FormControl>
											</FormGroup>
											<Button type='submit' variant='primary'>
												Submit your review
											</Button>
										</Form>
									) : (
										<Message>
											Please{' '}
											<Link to={`/login?redirect=product/${id}`}>sign in</Link>{' '}
											to post your review
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default ProductScreen
