import * as orderConstants from '../constants/orderConstants'

const initialStateForOrderCreateReducer = {
	loading: false,
	success: false,
	order: [],
	error: null
}

const orderCreateReset = () => ({
	...initialStateForOrderCreateReducer
})

const orderCreateRequest = (state) => ({
	...state,
	loading: true
})

const orderCreateSuccess = (state, payload) => ({
	...state,
	loading: false,
	success: true,
	order: payload,
	error: null
})

const orderCreateFail = (state, payload) => ({
	...state,
	loading: false,
	success: false,
	error: payload
})

export const orderCreateReducer = (
	state = initialStateForOrderCreateReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case orderConstants.ORDER_CREATE_RESET:
			return orderCreateReset()

		case orderConstants.ORDER_CREATE_REQUEST:
			return orderCreateRequest(state)

		case orderConstants.ORDER_CREATE_SUCCESS:
			return orderCreateSuccess(state, payload)

		case orderConstants.ORDER_CREATE_FAIL:
			return orderCreateFail(state, payload)

		default:
			return state
	}
}

const initialStateForOrderDetailsReducer = {
	loading: false,
	order: {},
	orderItems: [],
	shippingAddress: {},
	error: null
}

const orderDetailsRequest = (state) => ({
	...state,
	loading: true
})

const orderDetailsSuccess = (state, payload) => ({
	...state,
	loading: false,
	order: payload,
	error: null
})

const orderDetailsFail = (state, payload) => ({
	...state,
	loading: false,
	error: payload
})

export const orderDetailsReducer = (
	state = initialStateForOrderDetailsReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case orderConstants.ORDER_DETAILS_REQUEST:
			return orderDetailsRequest(state)

		case orderConstants.ORDER_DETAILS_SUCCESS:
			return orderDetailsSuccess(state, payload)

		case orderConstants.ORDER_DETAILS_FAIL:
			return orderDetailsFail(state, payload)

		default:
			return state
	}
}

const initialStateForOrderPayReducer = {
	loading: false,
	success: false,
	order: [],
	error: null
}

const orderPayReset = () => ({
	...initialStateForOrderPayReducer
})

const orderPayRequest = (state) => ({
	...state,
	loading: true
})

const orderPaySuccess = (state, payload) => ({
	...state,
	loading: false,
	success: true,
	error: null
})

const orderPayFail = (state, payload) => ({
	...state,
	loading: false,
	success: false,
	error: payload
})

export const orderPayReducer = (
	state = initialStateForOrderPayReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case orderConstants.ORDER_PAY_RESET:
			return orderPayReset()

		case orderConstants.ORDER_PAY_REQUEST:
			return orderPayRequest(state)

		case orderConstants.ORDER_PAY_SUCCESS:
			return orderPaySuccess(state, payload)

		case orderConstants.ORDER_PAY_FAIL:
			return orderPayFail(state, payload)

		default:
			return state
	}
}

const initialStateForOrderFetchMyOrdersReducer = {
	loading: false,
	orders: [],
	error: null
}

const orderFetchMyOrdersRequest = (state) => ({
	...state,
	loading: true,
	error: null
})

const orderFetchMyOrdersSuccess = (state, payload) => ({
	...state,
	loading: false,
	orders: payload,
	error: null
})

const orderFetchMyOrdersFail = (state, payload) => ({
	...state,
	loading: false,
	error: payload
})

export const orderFetchMyOrdersReducer = (
	state = initialStateForOrderFetchMyOrdersReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case orderConstants.ORDER_FETCH_MY_ORDERS_REQUEST:
			return orderFetchMyOrdersRequest(state)

		case orderConstants.ORDER_FETCH_MY_ORDERS_SUCCESS:
			return orderFetchMyOrdersSuccess(state, payload)

		case orderConstants.ORDER_FETCH_MY_ORDERS_FAIL:
			return orderFetchMyOrdersFail(state, payload)

		default:
			return state
	}
}

const initialStateForOrderFetchAllOrdersReducer = {
	loading: false,
	orders: [],
	error: null
}

const orderFetchAllOrdersRequest = (state) => ({
	...state,
	loading: true
})

const orderFetchAllOrdersSuccess = (state, payload) => ({
	...state,
	loading: false,
	orders: payload,
	error: null
})

const orderFetchAllOrdersFail = (state, payload) => ({
	...state,
	loading: false,
	error: payload
})

export const orderFetchAllOrdersReducer = (
	state = initialStateForOrderFetchAllOrdersReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case orderConstants.ORDER_FETCH_ALL_ORDERS_REQUEST:
			return orderFetchAllOrdersRequest(state)

		case orderConstants.ORDER_FETCH_ALL_ORDERS_SUCCESS:
			return orderFetchAllOrdersSuccess(state, payload)

		case orderConstants.ORDER_FETCH_ALL_ORDERS_FAIL:
			return orderFetchAllOrdersFail(state, payload)

		default:
			return state
	}
}

const initialStateForOrderDeliverReducer = {
	loading: false,
	success: false,
	order: [],
	error: null
}

const orderDeliverRequest = (state) => ({
	...state,
	loading: true
})

const orderDeliverReset = () => ({
	...initialStateForOrderDeliverReducer
})

const orderDeliverSuccess = (state, payload) => ({
	...state,
	loading: false,
	success: true,
	error: null
})

const orderDeliverFail = (state, payload) => ({
	...state,
	loading: false,
	success: false,
	error: payload
})

export const orderDeliverReducer = (
	state = initialStateForOrderDeliverReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case orderConstants.ORDER_DELIVER_REQUEST:
			return orderDeliverRequest(state)

		case orderConstants.ORDER_DELIVER_RESET:
			return orderDeliverReset()

		case orderConstants.ORDER_DELIVER_SUCCESS:
			return orderDeliverSuccess(state, payload)

		case orderConstants.ORDER_DELIVER_FAIL:
			return orderDeliverFail(state, payload)

		default:
			return state
	}
}
