import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const deleteProduct = createAsyncThunk(
	'product/delete',
	async (productId, thunkAPI) => {
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

			const { data } = await axios.delete(`/api/products/${productId}`, config)
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response.data.message ?? error.message
			)
		}
	}
)

const productDeleteSlice = createSlice({
	name: 'productDelete',
	initialState: {
		loading: false,
		success: false,
		message: null,
		error: null
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(deleteProduct.pending, (state) => {
				state.loading = true
				state.success = false
				state.error = null
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.loading = false
				state.error = null
				state.success = true
				state.message = action.payload
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.loading = false
				state.success = false
				state.error = action.payload
			})
	}
})

export default productDeleteSlice.reducer
