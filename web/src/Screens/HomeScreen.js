import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../Components/Product'
import { listProducts } from '../store/product/productListSlice'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import ProductCarousel from '../Components/ProductCarousel'
import Paginate from '../Components/Paginate'
import { useParams, Link } from 'react-router-dom'

const HomeScreen = () => {
	const { keyword, pageNumber = 1 } = useParams()

	const dispatch = useDispatch()
	const fetchProducts = useCallback(
		(keyword, pageNumber) => dispatch(listProducts({ keyword, pageNumber })),
		[dispatch]
	)
	const { loading, products, error, pages, page } = useSelector(
		(state) => state.productList
	)

	useEffect(() => {
		fetchProducts(keyword, pageNumber)
	}, [fetchProducts, keyword, pageNumber])

	const displayProducts = products.map((item) => (
		<Col sm={12} md={6} lg={4} xl={3} key={item._id}>
			<Product product={item} />
		</Col>
	))

	return (
		<>
			{keyword ? (
				<>
					<Link className='btn btn-light my-3' to='/'>
						Go Back
					</Link>
					<h1>{`Products related to "${keyword}"`}</h1>
				</>
			) : (
				<>
					<ProductCarousel />
					<h1>Latest Products</h1>
				</>
			)}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>{displayProducts}</Row>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
		</>
	)
}

export default HomeScreen
