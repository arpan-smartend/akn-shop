import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import FormContainer from '../Components/FormContainer'
import {
	listProductDetail,
	updateProduct,
	updateProductReset
} from '../actions/productActions'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

const ProductEditScreen = () => {
	const { id: productId } = useParams()

	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [image, setImage] = useState('')
	const [description, setDescription] = useState('')
	const [brand, setBrand] = useState('')
	const [category, setCategory] = useState('')
	const [countInStock, setCountInStock] = useState(0)
	const [uploading, setUploading] = useState(false)

	const dispatch = useDispatch()
	const history = useHistory()

	const { loading, error, product } = useSelector(
		(state) => state.productDetails
	)

	const {
		loading: productUpdateLoading,
		error: productUpdateError,
		success
	} = useSelector((state) => state.productUpdate)

	useEffect(() => {
		if (!product || product._id !== productId) {
			dispatch(listProductDetail(productId))
		} else {
			setName(product.name)
			setPrice(product.price)
			setImage(product.image)
			setDescription(product.description)
			setBrand(product.brand)
			setCategory(product.category)
			setCountInStock(product.countInStock)
		}
	}, [product, productId, dispatch])

	useEffect(() => {
		if (success) {
			dispatch(updateProductReset())
			history.push('/admin/productlist')
		}
	}, [success, dispatch, history])

	const submitHandler = useCallback(
		(e) => {
			e.preventDefault()
			dispatch(
				updateProduct({
					_id: productId,
					name,
					price,
					description,
					image,
					brand,
					category,
					countInStock
				})
			)
		},
		[
			dispatch,
			productId,
			name,
			price,
			description,
			image,
			brand,
			category,
			countInStock
		]
	)

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('image', file)
		setUploading(true)

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
			const { data } = await axios.post('/api/upload', formData, config)
			setImage(data)
			setUploading(false)
		} catch (error) {
			setUploading(false)
			console.warn(error)
		}
	}

	return (
		<>
			<Link to='/admin/productlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Product Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='price'>
						<Form.Label>Price</Form.Label>
						<Form.Control
							type='number'
							placeholder='Product Price'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='image'>
						<Form.Label>Image</Form.Label>
						<Form.Control
							type='text'
							placeholder='Product Image url'
							value={image}
							onChange={(e) => setImage(e.target.value)}
						></Form.Control>
						<Form.File
							id='image-file'
							label='Choose File'
							custom
							onChange={uploadFileHandler}
						></Form.File>
						{uploading && <Loader buttonLoader />}
					</Form.Group>
					<Form.Group controlId='description'>
						<Form.Label>Description</Form.Label>
						<Form.Control
							type='text'
							placeholder='Product Description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='brand'>
						<Form.Label>Brand</Form.Label>
						<Form.Control
							type='text'
							placeholder='Product Brand'
							value={brand}
							onChange={(e) => setBrand(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='category'>
						<Form.Label>Category</Form.Label>
						<Form.Control
							type='text'
							placeholder='Product Category'
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='countInStpck'>
						<Form.Label>Count In Stock</Form.Label>
						<Form.Control
							type='number'
							placeholder='Count In Stock'
							value={countInStock}
							onChange={(e) => setCountInStock(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Button type='submit' variant='primary'>
						{productUpdateLoading ? <Loader buttonLoader /> : 'Update'}
					</Button>
					{productUpdateError && (
						<Message variant='danger'>{productUpdateError}</Message>
					)}
				</Form>
			</FormContainer>
		</>
	)
}

export default ProductEditScreen
