import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const addToCart = createAsyncThunk(
	'cart/add',
	async ({ id, qty }, thunkAPI) => {
		const { data } = await axios.get(`/api/products/${id}`)
		thunkAPI.dispatch(
			cartSlice.actions.cartAddItem({
				product: data._id,
				name: data.name,
				image: data.image,
				price: data.price,
				countInStock: data.countInStock,
				qty
			})
		)
		localStorage.setItem(
			'cartItems',
			JSON.stringify(thunkAPI.getState().cart.cartItems)
		)
	}
)

export const removeFromCart = createAsyncThunk(
	'cart/remove',
	async (id, thunkAPI) => {
		thunkAPI.dispatch(cartSlice.actions.cartRemoveItem(id))
		localStorage.setItem(
			'cartItems',
			JSON.stringify(thunkAPI.getState().cart.cartItems)
		)
	}
)

export const saveShippingAddress = createAsyncThunk(
	'cart/saveShippingAddress',
	async (shippingDetails, thunkAPI) => {
		thunkAPI.dispatch(cartSlice.actions.saveShippingAddress(shippingDetails))
		localStorage.setItem('shippingAddress', JSON.stringify(shippingDetails))
	}
)

export const savePaymentMethod = createAsyncThunk(
	'cart/savePaymentMethod',
	async (paymentMethod, thunkAPI) => {
		thunkAPI.dispatch(cartSlice.actions.savePaymentMethod(paymentMethod))
		localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
	}
)

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cartItems: [],
		shippingAddress: null,
		paymentMethod: null
	},
	reducers: {
		cartAddItem(state, action) {
			const existItem = state.cartItems.find(
				(item) => item.product === action.payload.product
			)
			if (existItem) {
				const cartItems = state.cartItems.map((item) =>
					item.product === existItem.product ? action.payload : item
				)
				state.cartItems = cartItems
			} else {
				state.cartItems.push(action.payload)
			}
		},
		cartRemoveItem(state, action) {
			state.cartItems = state.cartItems.filter(
				(item) => item.product !== action.payload
			)
		},
		saveShippingAddress(state, action) {
			state.saveShippingAddress = action.payload
		},
		savePaymentMethod(state, action) {
			state.savePaymentMethod = action.payload
		}
	}
})

export default cartSlice.reducer
