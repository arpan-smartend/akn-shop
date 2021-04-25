import * as cartConstants from '../constants/cartConstants'

const initialState = {
	cartItems: [],
	shippingAddress: null,
	paymentMethod: null
}

const cartAddItem = (state, payload) => {
	const existItem = state.cartItems.find(
		(item) => item.product === payload.product
	)

	if (existItem) {
		const cartItems = state.cartItems.map((item) =>
			item.product === existItem.product ? payload : item
		)
		return {
			...state,
			cartItems
		}
	} else {
		return {
			...state,
			cartItems: [...state.cartItems, payload]
		}
	}
}

const cartRemoveItem = (state, payload) => {
	const updatedCartItems = state.cartItems.filter(
		(item) => item.product !== payload
	)
	return {
		...state,
		cartItems: updatedCartItems
	}
}

const saveShippingAddress = (state, payload) => ({
	...state,
	shippingAddress: payload
})

const cartSavePaymentMethod = (state, payload) => ({
	...state,
	paymentMethod: payload
})

export const cartReducer = (state = initialState, { type, payload = {} }) => {
	switch (type) {
		case cartConstants.CART_ADD_ITEM:
			return cartAddItem(state, payload)

		case cartConstants.CART_REMOVE_ITEM:
			return cartRemoveItem(state, payload)

		case cartConstants.CART_SAVE_SHIPPING_ADDRESS:
			return saveShippingAddress(state, payload)

		case cartConstants.CART_SAVE_PAYMENT_METHOD:
			return cartSavePaymentMethod(state, payload)
		default:
			return state
	}
}
