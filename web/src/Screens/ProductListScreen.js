import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import Paginate from '../Components/Paginate'
import { listProducts } from '../store/product/productListSlice'
import { deleteProduct } from '../store/product/productDeleteSlice'
import {
	createProduct,
	createProductReset
} from '../store/product/productCreateSlice'

const ProductListScreen = () => {
	const { pageNumber = 1 } = useParams()
	console.log(pageNumber)
	const dispatch = useDispatch()
	const history = useHistory()
	const { loading, products, error, pages, page } = useSelector(
		(state) => state.productList
	)
	const {
		success: productDeleteSuccess,
		loading: productDeleteLoading,
		error: productDeleteError
	} = useSelector((state) => state.productDelete)
	const {
		success: productCreateSuccess,
		product: createdProduct,
		loading: productCreateLoading,
		error: productCreateError
	} = useSelector((state) => state.productCreate)

	useEffect(() => {
		dispatch(createProductReset())
		dispatch(listProducts({ keyword: '', pageNumber }))
	}, [dispatch, pageNumber])

	useEffect(() => {
		if (productDeleteSuccess) {
			dispatch(listProducts({ keyword: '', pageNumber }))
		}
	}, [dispatch, productDeleteSuccess, pageNumber])

	useEffect(() => {
		if (productCreateSuccess) {
			history.push(`/admin/product/${createdProduct._id}/edit`)
		}
	}, [dispatch, productCreateSuccess, history, createdProduct])

	const deleteHandler = (id) => {
		window.confirm('Are you sure ?') && dispatch(deleteProduct(id))
	}

	const createProductHandler = () => {
		dispatch(createProduct())
	}

	const displayProducts = () => {
		if (!products.length) {
			return <Message>No products yet</Message>
		} else {
			const productsList = products.map((product) => (
				<tr key={product._id}>
					<td>{product._id}</td>
					<td>{product.name}</td>
					<td>&#x20B9; {product.price}</td>
					<td>{product.category}</td>
					<td>{product.brand}</td>
					<td>
						<LinkContainer to={`/admin/product/${product._id}/edit`}>
							<Button variant='light' className='btn-sm'>
								<i className='fas fa-edit'></i>
							</Button>
						</LinkContainer>
						<Button
							variant='danger'
							className='btn-sm'
							onClick={() => deleteHandler(product._id)}
						>
							<i className='fas fa-trash'></i>
						</Button>
					</td>
				</tr>
			))

			return (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Price</th>
							<th>Category</th>
							<th>Brand</th>
							<th></th>
						</tr>
					</thead>
					<tbody>{productsList}</tbody>
				</Table>
			)
		}
	}

	return (
		<>
			{productCreateError && (
				<Message variant='danger'>{productCreateError}</Message>
			)}
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createProductHandler}>
						<i className='fas fa-plus'></i> &nbsp; Create Product
						{productCreateLoading && <Loader buttonLoader />}
					</Button>
				</Col>
			</Row>
			{productDeleteLoading && <Loader />}
			{productDeleteError && (
				<Message variant='danger'>{productDeleteError}</Message>
			)}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					{displayProducts()}
					<Paginate pages={pages} page={page} isAdmin />
				</>
			)}
		</>
	)
}

export default ProductListScreen
