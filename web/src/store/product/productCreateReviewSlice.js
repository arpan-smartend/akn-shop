import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const createProductReview = createAsyncThunk(
	'product/createReview',
	async ({ id: productId, ...productReview }, thunkAPI) => {
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
			const { data } = await axios.post(
				`/api/products/${productId}/reviews`,
				productReview,
				config
			)
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response.data.message ?? error.message
			)
		}
	}
)

const productCreateReviewSlice = createSlice({
	name: 'productCreateReview',
	initialState: {
		loading: false,
		success: false,
		message: null,
		error: null
	},
	reducers: {
		createReviewReset(state) {
			state.loading = false
			state.success = false
			state.message = null
			state.error = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(createProductReview.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(createProductReview.fulfilled, (state, action) => {
				state.loading = false
				state.success = true
				state.message = action.payload
			})
			.addCase(createProductReview.rejected, (state, action) => {
				state.loading = false
				state.success = false
				state.error = action.payload
			})
	}
})

export const { createReviewReset } = productCreateReviewSlice.actions
export default productCreateReviewSlice.reducer
