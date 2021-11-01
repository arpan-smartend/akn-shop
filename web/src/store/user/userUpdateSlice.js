import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const updateUser = createAsyncThunk(
	'user/update',
	async (user, thunkAPI) => {
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
			const { data } = await axios.put(`/api/users/${user._id}`, user, config)
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error?.response?.data?.message ?? error?.message
			)
		}
	}
)

const userUpdateSlice = createSlice({
	name: 'userUpdate',
	initialState: {
		loading: false,
		error: null,
		success: false
	},
	reducers: {
		updateUserReset(state) {
			state.loading = false
			state.error = null
			state.success = false
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateUser.pending, (state) => {
				state.loading = true
				state.error = null
				state.success = false
			})
			.addCase(updateUser.fulfilled, (state) => {
				state.loading = false
				state.success = true
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export const { updateUserReset } = userUpdateSlice.actions
export default userUpdateSlice.reducer
