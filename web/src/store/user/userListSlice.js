import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchAllUsers = createAsyncThunk(
	'user/getAllUsers',
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

			const { data } = await axios.get('/api/users', config)
			return data
		} catch (error) {
			thunkAPI.rejectWithValue(error.response.data.message ?? error.message)
		}
	}
)

const userListSlice = createSlice({
	name: 'userList',
	initialState: {
		loading: false,
		users: [],
		error: null
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllUsers.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchAllUsers.fulfilled, (state, action) => {
				state.loading = false
				state.users = action.payload
			})
			.addCase(fetchAllUsers.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export default userListSlice.reducer
