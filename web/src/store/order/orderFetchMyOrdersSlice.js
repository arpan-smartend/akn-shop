import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchMyOrders = createAsyncThunk(
	'order/fetchMyOrder',
	async (_, thunkAPI) => {
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

			const { data } = await axios.get(`/api/orders/myorders`, config)
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response.data.message ?? error.message
			)
		}
	}
)

const orderFetchMyOrdersSlice = createSlice({
	name: 'orderFetchMyOrders',
	initialState: {
		loading: false,
		orders: [],
		error: null
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMyOrders.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchMyOrders.fulfilled, (state, action) => {
				state.loading = false
				state.orders = action.payload
			})
			.addCase(fetchMyOrders.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export default orderFetchMyOrdersSlice.reducer
