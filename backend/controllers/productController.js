import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//  @desc Fetch all products
//  @route GET /api/products
//  @access Public

const getProducts = asyncHandler(async ({ query }, res) => {
	const pageSize = 10
	let page = Number(query.pageNumber) || 1

	const keyword = query.keyword
		? {
				name: {
					$regex: query.keyword,
					$options: 'i'
				}
		  }
		: {}

	const count = await Product.countDocuments({ ...keyword })
	const pages = Math.ceil(count / pageSize)

	if (page > pages) page = 1

	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1))

	res.json({ products, page, pages })
})

//  @desc Fetch a single product
//  @route GET /api/products:id
//  @access Public

const getProductById = asyncHandler(async ({ params: { id } }, res) => {
	const product = await Product.findById(id).populate('reviews.user', 'name')
	if (product) {
		res.json(product)
	} else {
		res.status(404)
		throw new Error('Product Not Found')
	}
})

//  @desc Delete a product
//  @route DELETE /api/products:id
//  @access Private/admin

const deleteProduct = asyncHandler(async ({ params: { id } }, res) => {
	const product = await Product.findById(id)
	if (!product) {
		res.status(404)
		throw new Error('Product Not Found')
	} else {
		await product.remove()
		res.json({ message: 'Product Removed' })
	}
})

// @desc Create a Product
// @route POST /api/products
// @access Private/admin

const createProduct = asyncHandler(async ({ user }, res) => {
	const product = await Product.create({
		name: 'Sample Name',
		price: 0,
		user: user._id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample Description'
	})

	if (!product) {
		res.status(400)
		throw new Error('Invalid Product Data')
	} else {
		res.status(201).json(product)
	}
})

// @desc Update a Product
// @route PUT /api/products/:id
// @access Private/admin

const updateProduct = asyncHandler(async ({ params, body }, res) => {
	const {
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock
	} = body
	const product = await Product.findById(params.id)

	if (!product) {
		res.status(404)
		throw new Error('Product not found')
	}

	product.name = name ?? product.name
	product.price = price ?? product.price
	product.description = description ?? product.description
	product.image = image ?? product.image
	product.brand = brand ?? product.brand
	product.category = category ?? product.category
	product.countInStock = countInStock ?? product.countInStock

	const updatedProduct = await product.save()
	res.json(updatedProduct)
})

// @desc Create new review
// @route POST /api/products/:id/reviews
// @access Private

const createProductReview = asyncHandler(
	async ({ body, params, user }, res) => {
		const { rating, comment } = body
		const product = await Product.findById(params.id)

		if (!product) {
			res.status(404)
			throw new Error('Product not found')
		}

		const isAlreadyReviewed = product.reviews.find(
			(item) => item.user.toString() === user._id.toString()
		)

		if (isAlreadyReviewed) {
			res.status(400)
			throw new Error('Product Already Reviewed')
		}

		const review = {
			user: user._id,
			rating: Number(rating),
			comment
		}

		product.reviews.push(review)
		product.numReviews = product.reviews.length
		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length

		await product.save()
		res.status(201).json({ message: 'Your feedback is valuable' })
	}
)

// @desc Get top rated products
// @route GET /api/products/top
// @access Public

const getTopRatedProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3)

	res.json(products)
})

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopRatedProducts
}
