import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const listProducts = createAsyncThunk(
	'product/fetchProducts',
	async ({ keyword = '', pageNumber = '' }, thunkAPI) => {
		try {
			const { data } = await axios.get(
				`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
			)
			return data
		} catch (error) {
			console.log(error)
			return thunkAPI.rejectWithValue(
				error.response.data.message ?? error.message
			)
		}
	}
)
const productListSlice = createSlice({
	name: 'productList',
	initialState: {
		loading: false,
		products: [],
		pages: '',
		page: '',
		error: null
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(listProducts.pending, (state) => {
				state.loading = true
			})
			.addCase(listProducts.fulfilled, (state, action) => {
				state.loading = false
				state.products = action.payload.products
				state.pages = action.payload.pages
				state.page = action.payload.page
				state.error = null
			})
			.addCase(listProducts.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export default productListSlice.reducer
