import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getOrderDetails = createAsyncThunk(
	'order/getDetails',
	async (orderId, thunkAPI) => {
		try {
			const {
				userLogin: {
					userInfo: { token }
				}
			} = thunkAPI.getState()

			const config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}

			const { data } = await axios.get(`/api/orders/${orderId}`, config)
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response.data.message ?? error.message
			)
		}
	}
)

const orderDetailsSlice = createSlice({
	name: 'orderDetails',
	initialState: {
		loading: false,
		order: {},
		error: null
	},
	reducers: {
		orderDetailsSuccess(state, action) {
			state.loading = false
			state.order = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getOrderDetails.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(getOrderDetails.fulfilled, (state, action) => {
				state.loading = false
				state.order = action.payload
			})
			.addCase(getOrderDetails.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export const { orderDetailsSuccess } = orderDetailsSlice.actions
export default orderDetailsSlice.reducer
