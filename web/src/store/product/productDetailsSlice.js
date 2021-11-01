import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const listProductDetail = createAsyncThunk(
	'product/getDetails',
	async (id, thunkAPI) => {
		try {
			const { data } = await axios.get(`/api/products/${id}`)
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response.data.message ?? error.message
			)
		}
	}
)

const productDetailsSlice = createSlice({
	name: 'productDetails',
	initialState: {
		product: {
			reviews: []
		},
		loading: false,
		error: null
	},
	reducers: {
		productDetailsSuccess(state, action) {
			state.loading = false
			state.product = action.payload
			state.error = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(listProductDetail.pending, (state) => {
				state.loading = true
			})
			.addCase(listProductDetail.fulfilled, (state, action) => {
				state.loading = false
				state.product = action.payload
				state.error = null
			})
			.addCase(listProductDetail.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export const { productDetailsSuccess } = productDetailsSlice.actions
export default productDetailsSlice.reducer
