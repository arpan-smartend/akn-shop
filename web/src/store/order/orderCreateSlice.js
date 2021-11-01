import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const createOrder = createAsyncThunk(
	'order/create',
	async (order, thunkAPI) => {
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

			const { data } = await axios.post(`/api/orders`, order, config)
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response.data.message ?? error.message
			)
		}
	}
)

const orderCreateSlice = createSlice({
	name: 'orderCreate',
	initialState: {
		loading: false,
		success: false,
		order: [],
		error: null
	},
	reducers: {
		resetOrderState(state) {
			state.loading = false
			state.success = false
			state.order = []
			state.error = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.loading = false
				state.success = true
				state.order = action.payload
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.loading = false
				state.success = false
				state.error = action.payload
			})
	}
})

export const { resetOrderState } = orderCreateSlice.actions
export default orderCreateSlice.reducer
