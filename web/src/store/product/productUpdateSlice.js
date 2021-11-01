import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { productDetailsSuccess } from './productDetailsSlice'

export const updateProduct = createAsyncThunk(
	'product/update',
	async (product, thunkAPI) => {
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
				`/api/products/${product._id}`,
				product,
				config
			)
			thunkAPI.dispatch(productDetailsSuccess(data))
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response.data.message ?? error.message
			)
		}
	}
)

const productUpdateSlice = createSlice({
	name: 'productUpdate',
	initialState: {
		loading: false,
		success: false,
		product: {},
		error: null
	},
	reducers: {
		updateProductReset(state) {
			state.loading = false
			state.success = false
			state.product = {}
			state.error = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateProduct.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				state.loading = false
				state.success = true
				state.product = action.payload
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.loading = false
				state.success = false
				state.error = action.payload
			})
	}
})

export const { updateProductReset } = productUpdateSlice.actions
export default productUpdateSlice.reducer
