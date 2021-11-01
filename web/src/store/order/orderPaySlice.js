import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { orderDetailsSuccess } from './orderDetailsSlice'

export const payOrder = createAsyncThunk(
	'order/pay',
	async (orderId, thunkAPI) => {
		try {
			const {
				userLogin: {
					userInfo: { token, email }
				}
			} = thunkAPI.getState()

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

			thunkAPI.dispatch(orderDetailsSuccess(data))
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response.data.message ?? error.message
			)
		}
	}
)

const orderPaySlice = createSlice({
	name: 'orderPay',
	initialState: {
		loading: false,
		success: false,
		error: null
	},
	reducers: {
		resetPaymentState(state) {
			state.loading = false
			state.success = false
			state.error = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(payOrder.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(payOrder.fulfilled, (state) => {
				state.loading = false
				state.success = true
			})
			.addCase(payOrder.rejected, (state, action) => {
				state.loading = false
				state.success = false
				state.error = action.payload
			})
	}
})

export const { resetPaymentState } = orderPaySlice.actions
export default orderPaySlice.reducer
