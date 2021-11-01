import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopRatedProducts } from '../store/product/productTopRatedSlice'

const ProductCarousel = () => {
	const dispatch = useDispatch()
	const { loading, products, error } = useSelector(
		(state) => state.productTopRated
	)

	useEffect(() => {
		dispatch(listTopRatedProducts())
	}, [dispatch])

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<Carousel pause='hover' className='bg-dark'>
			{products.map((item) => (
				<Carousel.Item key={item._id}>
					<Link to={`/product/${item._id}`}>
						<Image src={item.image} alt={item.name} fluid />

						<h2>
							{item.name} (&#x20B9; {item.price})
						</h2>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	)
}

export default ProductCarousel
