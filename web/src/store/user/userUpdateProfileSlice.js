import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userLoginSuccess } from './userLoginSlice'

export const updateUserProfile = createAsyncThunk(
	'user/updateProfile',
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
			const { data } = await axios.put(`/api/users/profile`, user, config)
			thunkAPI.dispatch(userLoginSuccess(data))
			localStorage.setItem('userInfo', JSON.stringify(data))
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response.data.message ?? error.message
			)
		}
	}
)

const userUpdateProfileSlice = createSlice({
	name: 'userUpdateProfile',
	initialState: {
		loading: false,
		userInfo: null,
		error: null,
		success: false
	},
	reducers: {
		updateProfileReset(state) {
			state.loading = false
			state.userInfo = null
			state.error = null
			state.success = false
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateUserProfile.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(updateUserProfile.fulfilled, (state, action) => {
				state.loading = false
				state.userInfo = action.payload
				state.success = true
			})
			.addCase(updateUserProfile.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
				state.success = false
			})
	}
})

export const { updateProfileReset } = userUpdateProfileSlice.actions
export default userUpdateProfileSlice.reducer
