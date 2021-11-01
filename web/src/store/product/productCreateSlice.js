import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createProduct = createAsyncThunk(
	'product/create',
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
			const { data } = await axios.post('/api/products', {}, config)
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response.data.message ?? error.message
			)
		}
	}
)

const productCreateSlice = createSlice({
	name: 'productCreate',
	initialState: {
		loading: false,
		success: false,
		product: {
			reviews: []
		},
		error: null
	},
	reducers: {
		createProductReset(state) {
			state.loading = false
			state.success = false
			state.product = {
				reviews: []
			}
			state.error = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(createProduct.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.loading = false
				state.product = action.payload
				state.success = true
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.loading = false
				state.success = false
				state.error = action.payload
			})
	}
})

export const { createProductReset } = productCreateSlice.actions
export default productCreateSlice.reducer
