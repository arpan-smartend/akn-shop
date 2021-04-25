import * as productConstants from '../constants/productConstants'

const initialStateForProductList = {
	loading: false,
	products: [],
	pages: '',
	page: '',
	error: null
}

const productListRequest = (state) => ({
	...state,
	loading: true
})

const productListSuccess = (state, { products, page, pages }) => ({
	...state,
	loading: false,
	products,
	pages,
	page,
	error: null
})

const productListFail = (state, payload) => ({
	...state,
	loading: false,
	error: payload
})

export const productListReducer = (
	state = initialStateForProductList,
	{ type, payload = {} }
) => {
	switch (type) {
		case productConstants.PRODUCT_LIST_REQUEST:
			return productListRequest(state)

		case productConstants.PRODUCT_LIST_SUCCESS:
			return productListSuccess(state, payload)

		case productConstants.PRODUCT_LIST_FAIL:
			return productListFail(state, payload)

		default:
			return state
	}
}

const initialStateForProductDetails = {
	product: {
		reviews: []
	},
	loading: false,
	error: null
}

const productDetailsRequest = (state) => ({
	...state,
	loading: true
})

const productDetailsSuccess = (state, payload) => ({
	...state,
	loading: false,
	product: payload,
	error: null
})
const productDetailsFail = (state, payload) => ({
	...state,
	loading: false,
	error: payload
})

export const productDetailsReducer = (
	state = initialStateForProductDetails,
	{ type, payload = {} }
) => {
	switch (type) {
		case productConstants.PRODUCT_DETAILS_REQUEST:
			return productDetailsRequest(state)

		case productConstants.PRODUCT_DETAILS_SUCCESS:
			return productDetailsSuccess(state, payload)

		case productConstants.PRODUCT_DETAILS_FAIL:
			return productDetailsFail(state, payload)

		default:
			return state
	}
}

const initialStateForProductDeleteReducer = {
	loading: false,
	success: false,
	message: null,
	error: null
}

const productDeleteRequest = (state) => ({
	...state,
	loading: true,
	success: false,
	error: null
})
const productDeleteSuccess = (state, payload) => ({
	...state,
	loading: false,
	error: null,
	success: true,
	message: payload
})
const productDeleteFail = (state, payload) => ({
	...state,
	loading: false,
	success: false,
	error: payload
})

export const productDeleteReducer = (
	state = initialStateForProductDeleteReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case productConstants.PRODUCT_DELETE_REQUEST:
			return productDeleteRequest(state)

		case productConstants.PRODUCT_DELETE_SUCCESS:
			return productDeleteSuccess(state, payload)

		case productConstants.PRODUCT_DELETE_FAIL:
			return productDeleteFail(state, payload)

		default:
			return state
	}
}

const initalStateForProductCreateReducer = {
	loading: false,
	success: false,
	product: {
		reviews: []
	},
	error: null
}

const productCreateRequest = (state) => ({
	...state,
	loading: true,
	error: null
})
const productCreateSuccess = (state, payload) => ({
	...state,
	loading: false,
	product: payload,
	success: true
})
const productCreateFail = (state, payload) => ({
	...state,
	loading: false,
	success: false,
	error: payload
})
const productCreateReset = () => ({
	...initalStateForProductCreateReducer
})

export const productCreateReducer = (
	state = initalStateForProductCreateReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case productConstants.PRODUCT_CREATE_REQUEST:
			return productCreateRequest(state)

		case productConstants.PRODUCT_CREATE_SUCCESS:
			return productCreateSuccess(state, payload)

		case productConstants.PRODUCT_CREATE_FAIL:
			return productCreateFail(state, payload)

		case productConstants.PRODUCT_CREATE_RESET:
			return productCreateReset()

		default:
			return state
	}
}

const initalStateForProductUpdateReducer = {
	loading: false,
	success: false,
	product: {},
	error: null
}

const productUpdateRequest = (state) => ({
	...state,
	loading: true,
	error: null
})
const productUpdateSuccess = (state, payload) => ({
	...state,
	loading: false,
	product: payload,
	success: true
})
const productUpdateFail = (state, payload) => ({
	...state,
	loading: false,
	success: false,
	error: payload
})
const productUpdateReset = () => ({
	...initalStateForProductUpdateReducer
})

export const productUpdateReducer = (
	state = initalStateForProductUpdateReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case productConstants.PRODUCT_UPDATE_REQUEST:
			return productUpdateRequest(state)

		case productConstants.PRODUCT_UPDATE_SUCCESS:
			return productUpdateSuccess(state, payload)

		case productConstants.PRODUCT_UPDATE_FAIL:
			return productUpdateFail(state, payload)

		case productConstants.PRODUCT_UPDATE_RESET:
			return productUpdateReset()

		default:
			return state
	}
}

const initalStateForProductCreateReviewReducer = {
	loading: false,
	success: false,
	message: null,
	error: null
}

const productCreateReviewRequest = (state) => ({
	...state,
	loading: true,
	error: null
})
const productCreateReviewSuccess = (state, payload) => ({
	...state,
	loading: false,
	message: payload.message,
	success: true
})
const productCreateReviewFail = (state, payload) => ({
	...state,
	loading: false,
	success: false,
	error: payload
})
const productCreateReviewReset = () => ({
	...initalStateForProductCreateReviewReducer
})

export const productCreateReviewReducer = (
	state = initalStateForProductCreateReviewReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case productConstants.PRODUCT_CREATE_REVIEW_REQUEST:
			return productCreateReviewRequest(state)

		case productConstants.PRODUCT_CREATE_REVIEW_SUCCESS:
			return productCreateReviewSuccess(state, payload)

		case productConstants.PRODUCT_CREATE_REVIEW_FAIL:
			return productCreateReviewFail(state, payload)

		case productConstants.PRODUCT_CREATE_REVIEW_RESET:
			return productCreateReviewReset()

		default:
			return state
	}
}

const initialStateForProductTopRatedReducer = {
	loading: false,
	products: [],
	error: null
}

const productTopRatedRequest = (state) => ({
	...state,
	loading: true
})

const productTopRatedSuccess = (state, payload) => ({
	...state,
	loading: false,
	products: payload,
	error: null
})

const productTopRatedFail = (state, payload) => ({
	...state,
	loading: false,
	error: payload
})

export const productTopRatedReducer = (
	state = initialStateForProductTopRatedReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case productConstants.PRODUCT_TOP_RATED_REQUEST:
			return productTopRatedRequest(state)

		case productConstants.PRODUCT_TOP_RATED_SUCCESS:
			return productTopRatedSuccess(state, payload)

		case productConstants.PRODUCT_TOP_RATED_FAIL:
			return productTopRatedFail(state, payload)

		default:
			return state
	}
}
