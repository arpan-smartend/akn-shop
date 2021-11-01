import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const register = createAsyncThunk(
	'user/register',
	async ({ name, email, password }, thunkAPI) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}
			const { data } = await axios.post(
				'/api/users',
				{ name, email, password },
				config
			)
			localStorage.setItem('userInfo', JSON.stringify(data))
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response.data.message ?? error.message
			)
		}
	}
)

const userRegisterSlice = createSlice({
	name: 'userRegister',
	initialState: {
		loading: false,
		userInfo: null,
		error: null
	},
	reducers: {
		userRegisterReset(state) {
			state.loading = false
			state.userInfo = null
			state.error = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false
				state.userInfo = action.payload
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})
export const { userRegisterReset } = userRegisterSlice.actions
export default userRegisterSlice.reducer
