import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { orderDetailsSuccess } from './orderDetailsSlice'

export const deliverOrder = createAsyncThunk(
	'order/deliver',
	async (orderId, thunkAPI) => {
		try {
			const {
				userLogin: {
					userInfo: { token }
				}
			} = thunkAPI.getState()

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
			thunkAPI.dispatch(orderDetailsSuccess(data))
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response.data.message ?? error.message
			)
		}
	}
)

const orderDeliverSlice = createSlice({
	name: 'orderDeliver',
	initialState: {
		loading: false,
		success: false,
		error: null
	},
	reducers: {
		resetDeliveryState(state) {
			state.loading = false
			state.success = false
			state.error = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(deliverOrder.pending, (state) => {
				state.loading = true
			})
			.addCase(deliverOrder.fulfilled, (state) => {
				state.loading = false
				state.success = true
				state.error = null
			})
			.addCase(deliverOrder.rejected, (state, action) => {
				state.loading = false
				state.success = false
				state.error = action.payload
			})
	}
})

export const { resetDeliveryState } = orderDeliverSlice.actions
export default orderDeliverSlice.reducer
