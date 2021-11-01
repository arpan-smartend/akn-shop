import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const userDetails = createAsyncThunk(
	'user/getDetails',
	async (id, thunkAPI) => {
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
			const { data } = await axios.get(`/api/users/${id}`, config)
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response.data.message ?? error.message
			)
		}
	}
)

const userDetailsSlice = createSlice({
	name: 'userDetails',
	initialState: {
		loading: false,
		user: null,
		error: null
	},
	reducers: {
		userDetailsReset(state) {
			state.loading = false
			state.user = null
			state.error = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(userDetails.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(userDetails.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload
			})
			.addCase(userDetails.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})
export const { userDetailsReset } = userDetailsSlice.actions
export default userDetailsSlice.reducer
