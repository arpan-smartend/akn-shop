import axios from 'axios'
import * as cartConstants from '../constants/cartConstants'

const cart_add_item = (productDetails, qty) => {
	const payload = {
		product: productDetails._id,
		name: productDetails.name,
		image: productDetails.image,
		price: productDetails.price,
		countInStock: productDetails.countInStock,
		qty
	}
	return {
		type: cartConstants.CART_ADD_ITEM,
		payload
	}
}

const cart_remove_item = (productId) => ({
	type: cartConstants.CART_REMOVE_ITEM,
	payload: productId
})

const save_shipping_address = (payload) => ({
	type: cartConstants.CART_SAVE_SHIPPING_ADDRESS,
	payload
})

const save_payment_method = (payload) => ({
	type: cartConstants.CART_SAVE_PAYMENT_METHOD,
	payload
})

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`)
	dispatch(cart_add_item(data, qty))
	//we can only save string in localstorage, that's why we are using JSON.stringify
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch(cart_remove_item(id))
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (shippingDetails) => (dispatch) => {
	dispatch(save_shipping_address(shippingDetails))
	localStorage.setItem('shippingAddress', JSON.stringify(shippingDetails))
}

export const savePaymentMethod = (paymentMethod) => (dispatch) => {
	dispatch(save_payment_method(paymentMethod))
	localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
}
