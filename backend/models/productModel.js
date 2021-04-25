import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		rating: {
			type: Number,
			required: true,
			default: 5
		},
		comment: {
			type: String,
			required: true,
			trim: true
		}
	},
	{
		timestamps: true
	}
)

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		name: {
			type: String,
			required: [true, 'Name is a mandatory field'],
			trim: true
		},
		image: {
			type: String,
			required: [true, 'Image is a mandatory field'],
			trim: true
		},
		brand: {
			type: String,
			required: [true, 'Brand is a mandatory field'],
			trim: true
		},
		category: {
			type: String,
			required: [true, 'Category is a mandatory field'],
			trim: true
		},
		description: {
			type: String,
			required: [true, 'description is a mandatory field'],
			trim: true
		},
		reviews: [reviewSchema],
		rating: {
			type: Number,
			required: [true, 'rating is a mandatory field'],
			default: 0
		},
		numReviews: {
			type: Number,
			required: [true, 'numReviews is a mandatory field'],
			default: 0
		},
		price: {
			type: Number,
			required: [true, 'price is a mandatory field'],
			default: 0
		},
		countInStock: {
			type: Number,
			required: [true, 'countInStock is a mandatory field'],
			default: 0
		}
	},
	{
		timestamps: true
	}
)

const Product = mongoose.model('Product', productSchema)
export default Product
