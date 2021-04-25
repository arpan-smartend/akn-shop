import axios from 'axios'
import * as orderConstants from '../constants/orderConstants'

const order_create_reset = () => ({
	type: orderConstants.ORDER_CREATE_RESET
})

const order_create_request = () => ({
	type: orderConstants.ORDER_CREATE_REQUEST
})

const order_create_success = (payload) => ({
	type: orderConstants.ORDER_CREATE_SUCCESS,
	payload
})

const order_create_fail = (payload) => ({
	type: orderConstants.ORDER_CREATE_FAIL,
	payload
})

export const resetOrderState = () => (dispatch) => {
	dispatch(order_create_reset())
}

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch(order_create_request())

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

		const { data } = await axios.post(`/api/orders`, order, config)
		dispatch(order_create_success(data))
	} catch (error) {
		const errMsg = error.response.data.message ?? error.message
		dispatch(order_create_fail(errMsg))
	}
}

const order_details_request = () => ({
	type: orderConstants.ORDER_DETAILS_REQUEST
})

const order_details_success = (payload) => ({
	type: orderConstants.ORDER_DETAILS_SUCCESS,
	payload
})

const order_details_fail = (payload) => ({
	type: orderConstants.ORDER_DETAILS_FAIL,
	payload
})

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
	try {
		dispatch(order_details_request())

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

		const { data } = await axios.get(`/api/orders/${orderId}`, config)
		dispatch(order_details_success(data))
	} catch (error) {
		const errMsg = error.response.data.message ?? error.message
		dispatch(order_details_fail(errMsg))
	}
}

const order_pay_reset = () => ({
	type: orderConstants.ORDER_PAY_RESET
})

const order_pay_request = () => ({
	type: orderConstants.ORDER_PAY_REQUEST
})

const order_pay_success = (payload) => ({
	type: orderConstants.ORDER_PAY_SUCCESS,
	payload
})

const order_pay_fail = (payload) => ({
	type: orderConstants.ORDER_PAY_FAIL,
	payload
})

export const resetPaymentState = () => (dispatch) => {
	dispatch(order_pay_reset())
}

export const payOrder = (orderId) => async (dispatch, getState) => {
	try {
		dispatch(order_pay_request())

		const {
			userLogin: {
				userInfo: { token, email }
			}
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}

		const { data } = await axios.put(
			`/api/orders/${orderId}/pay`,
			{
				id: orderId,
				status: 'COMPLETED',
				update_time: Date.now(),
				payer: { email_address: email }
			},
			config
		)
		dispatch(order_pay_success(data))
		dispatch(order_details_success(data))
	} catch (error) {
		const errMsg = error.response.data.message ?? error.message
		dispatch(order_pay_fail(errMsg))
	}
}

const order_fetch_my_orders_request = () => ({
	type: orderConstants.ORDER_FETCH_MY_ORDERS_REQUEST
})

const order_fetch_my_orders_success = (payload) => ({
	type: orderConstants.ORDER_FETCH_MY_ORDERS_SUCCESS,
	payload
})

const order_fetch_my_orders_fail = (payload) => ({
	type: orderConstants.ORDER_FETCH_MY_ORDERS_FAIL,
	payload
})

export const fetchMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch(order_fetch_my_orders_request())

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

		const { data } = await axios.get(`/api/orders/myorders`, config)
		dispatch(order_fetch_my_orders_success(data))
	} catch (error) {
		const errMsg = error.response.data.message ?? error.message
		dispatch(order_fetch_my_orders_fail(errMsg))
	}
}

const order_fetch_all_orders_request = () => ({
	type: orderConstants.ORDER_FETCH_ALL_ORDERS_REQUEST
})

const order_fetch_all_orders_success = (payload) => ({
	type: orderConstants.ORDER_FETCH_ALL_ORDERS_SUCCESS,
	payload
})

const order_fetch_all_orders_fail = (payload) => ({
	type: orderConstants.ORDER_FETCH_ALL_ORDERS_FAIL,
	payload
})

export const fetchAllOrders = () => async (dispatch, getState) => {
	try {
		dispatch(order_fetch_all_orders_request())

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

		const { data } = await axios.get(`/api/orders`, config)
		dispatch(order_fetch_all_orders_success(data))
	} catch (error) {
		const errMsg = error?.response?.data?.message ?? error?.message
		dispatch(order_fetch_all_orders_fail(errMsg))
	}
}

const order_deliver_reset = () => ({
	type: orderConstants.ORDER_DELIVER_RESET
})

const order_deliver_request = () => ({
	type: orderConstants.ORDER_DELIVER_REQUEST
})

const order_deliver_success = (payload) => ({
	type: orderConstants.ORDER_DELIVER_SUCCESS,
	payload
})

const order_deliver_fail = (payload) => ({
	type: orderConstants.ORDER_DELIVER_FAIL,
	payload
})

export const resetDeliveryState = () => (dispatch) => {
	dispatch(order_deliver_reset())
}

export const deliverOrder = (orderId) => async (dispatch, getState) => {
	try {
		dispatch(order_deliver_request())

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
			`/api/orders/${orderId}/deliver`,
			{},
			config
		)
		dispatch(order_deliver_success(data))
		dispatch(order_details_success(data))
	} catch (error) {
		const errMsg = error.response.data.message ?? error.message
		dispatch(order_deliver_fail(errMsg))
	}
}
