import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const listTopRatedProducts = createAsyncThunk(
	'product/fetchTopRated',
	async (_, thunkAPI) => {
		try {
			const { data } = await axios.get(`/api/products/top`)
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response.data.message ?? error.message
			)
		}
	}
)

const productTopRatedSlice = createSlice({
	name: 'productTopRated',
	initialState: {
		loading: false,
		products: [],
		error: null
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(listTopRatedProducts.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(listTopRatedProducts.fulfilled, (state, action) => {
				state.loading = false
				state.products = action.payload
			})
			.addCase(listTopRatedProducts.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export default productTopRatedSlice.reducer
