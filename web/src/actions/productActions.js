import axios from 'axios'
import * as productConstants from '../constants/productConstants'

const product_list_request = () => ({
	type: productConstants.PRODUCT_LIST_REQUEST
})

const product_list_success = (payload) => ({
	type: productConstants.PRODUCT_LIST_SUCCESS,
	payload
})

const product_list_fail = (payload) => ({
	type: productConstants.PRODUCT_LIST_FAIL,
	payload
})

export const listProducts = (keyword = '', pageNumber = '') => async (
	dispatch
) => {
	try {
		dispatch(product_list_request())
		const { data } = await axios.get(
			`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
		)
		dispatch(product_list_success(data))
	} catch (error) {
		const errMsg = error.response.data.message ?? error.message
		dispatch(product_list_fail(errMsg))
	}
}

const product_details_request = () => ({
	type: productConstants.PRODUCT_DETAILS_REQUEST
})

const product_details_success = (payload) => ({
	type: productConstants.PRODUCT_DETAILS_SUCCESS,
	payload
})

const product_details_fail = (payload) => ({
	type: productConstants.PRODUCT_DETAILS_FAIL,
	payload
})

export const listProductDetail = (id) => async (dispatch) => {
	try {
		dispatch(product_details_request())
		const { data } = await axios.get(`/api/products/${id}`)
		dispatch(product_details_success(data))
	} catch (error) {
		const errMsg = error.response.data.message ?? error.message
		dispatch(product_details_fail(errMsg))
	}
}

const product_delete_request = () => ({
	type: productConstants.PRODUCT_DELETE_REQUEST
})

const product_delete_success = (payload) => ({
	type: productConstants.PRODUCT_DELETE_SUCCESS,
	payload
})

const product_delete_fail = (payload) => ({
	type: productConstants.PRODUCT_DELETE_FAIL,
	payload
})

export const deleteProduct = (productId) => async (dispatch, getState) => {
	try {
		dispatch(product_delete_request())
		const {
			userLogin: {
				userInfo: { token }
			}
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}

		const { data } = await axios.delete(`/api/products/${productId}`, config)
		dispatch(product_delete_success(data))
	} catch (error) {
		const errMsg = error.response.data.message ?? error.message
		dispatch(product_delete_fail(errMsg))
	}
}

const product_create_request = () => ({
	type: productConstants.PRODUCT_CREATE_REQUEST
})
const product_create_success = (payload) => ({
	type: productConstants.PRODUCT_CREATE_SUCCESS,
	payload
})
const product_create_reset = () => ({
	type: productConstants.PRODUCT_CREATE_RESET
})
const product_create_fail = (payload) => ({
	type: productConstants.PRODUCT_CREATE_FAIL,
	payload
})

export const createProduct = () => async (dispatch, getState) => {
	try {
		dispatch(product_create_request())
		const {
			userLogin: {
				userInfo: { token }
			}
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}

		const { data } = await axios.post('/api/products', {}, config)
		dispatch(product_create_success(data))
	} catch (error) {
		const errMsg = error?.response?.data?.message ?? error?.message
		dispatch(product_create_fail(errMsg))
	}
}

export const createProductReset = () => (dispatch) => {
	dispatch(product_create_reset())
}

const product_update_request = () => ({
	type: productConstants.PRODUCT_UPDATE_REQUEST
})

const product_update_success = (payload) => ({
	type: productConstants.PRODUCT_UPDATE_SUCCESS,
	payload
})

const product_update_fail = (payload) => ({
	type: productConstants.PRODUCT_UPDATE_FAIL,
	payload
})

const product_update_reset = () => ({
	type: productConstants.PRODUCT_UPDATE_RESET
})

export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch(product_update_request())
		const {
			userLogin: {
				userInfo: { token }
			}
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}
		const { data } = await axios.put(
			`/api/products/${product._id}`,
			product,
			config
		)
		dispatch(product_update_success(data))
		dispatch(product_details_success(data))
	} catch (error) {
		const errMsg = error?.response?.data?.message ?? error?.message
		dispatch(product_update_fail(errMsg))
	}
}
export const updateProductReset = () => (dispatch) => {
	dispatch(product_update_reset())
}

const product_create_review_request = () => ({
	type: productConstants.PRODUCT_CREATE_REVIEW_REQUEST
})

const product_create_review_success = (payload) => ({
	type: productConstants.PRODUCT_CREATE_REVIEW_SUCCESS,
	payload
})

const product_create_review_fail = (payload) => ({
	type: productConstants.PRODUCT_CREATE_REVIEW_FAIL,
	payload
})

const product_create_review_reset = () => ({
	type: productConstants.PRODUCT_CREATE_REVIEW_RESET
})

export const createProductReview = (productId, productReview) => async (
	dispatch,
	getState
) => {
	try {
		dispatch(product_create_review_request())
		const {
			userLogin: {
				userInfo: { token }
			}
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}
		const { data } = await axios.post(
			`/api/products/${productId}/reviews`,
			productReview,
			config
		)
		dispatch(product_create_review_success(data))
	} catch (error) {
		const errMsg = error?.response?.data?.message ?? error?.message
		dispatch(product_create_review_fail(errMsg))
	}
}
export const createReviewReset = () => (dispatch) => {
	dispatch(product_create_review_reset())
}

const product_top_rated_request = () => ({
	type: productConstants.PRODUCT_TOP_RATED_REQUEST
})

const product_top_rated_success = (payload) => ({
	type: productConstants.PRODUCT_TOP_RATED_SUCCESS,
	payload
})

const product_top_rated_fail = (payload) => ({
	type: productConstants.PRODUCT_TOP_RATED_FAIL,
	payload
})

export const listTopRatedProducts = () => async (dispatch) => {
	try {
		dispatch(product_top_rated_request())
		const { data } = await axios.get(`/api/products/top`)
		dispatch(product_top_rated_success(data))
	} catch (error) {
		const errMsg = error.response.data.message ?? error.message
		dispatch(product_top_rated_fail(errMsg))
	}
}
