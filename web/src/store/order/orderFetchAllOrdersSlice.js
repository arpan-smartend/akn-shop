import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchAllOrders = createAsyncThunk(
	'order/fetchAllOrders',
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

			const { data } = await axios.get(`/api/orders`, config)
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error?.response?.data?.message ?? error?.message
			)
		}
	}
)

const orderFetchAllOrdersSlice = createSlice({
	name: 'orderFetchAllOrders',
	initialState: {
		loading: false,
		orders: [],
		error: null
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllOrders.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchAllOrders.fulfilled, (state, action) => {
				state.loading = false
				state.orders = action.payload
			})
			.addCase(fetchAllOrders.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export default orderFetchAllOrdersSlice.reducer
