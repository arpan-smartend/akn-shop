import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const deleteUser = createAsyncThunk(
	'user/delete',
	async (userId, thunkAPI) => {
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

			const { data } = await axios.delete(`/api/users/${userId}`, config)
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response.data.message ?? error.message
			)
		}
	}
)

const userDeleteSlice = createSlice({
	name: 'userDelete',
	initialState: {
		loading: true,
		success: false,
		message: null,
		error: null
	},
	extraReducers: (builder) => {
		builder
			.addCase(deleteUser.pending, (state) => {
				state.loading = true
				state.success = false
				state.error = null
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.loading = false
				state.success = true
				state.message = action.payload
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.loading = false
				state.success = false
				state.error = action.payload
			})
	}
})

export default userDeleteSlice.reducer
