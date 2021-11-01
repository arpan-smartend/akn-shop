import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userRegisterReset } from './userRegisterSlice'
import { userDetailsReset } from './userDetailsSlice'
import { updateProfileReset } from './userUpdateProfileSlice'

export const login = createAsyncThunk(
	'user/login',
	async ({ email, password }, thunkAPI) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}
			const { data } = await axios.post(
				'/api/users/login',
				{ email, password },
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

export const logout = createAsyncThunk('user/logout', (_, thunkAPI) => {
	localStorage.removeItem('userInfo')
	localStorage.removeItem('cartItems')
	thunkAPI.dispatch(userLoginSlice.actions.userLogout())
	thunkAPI.dispatch(userRegisterReset())
	thunkAPI.dispatch(userDetailsReset())
	thunkAPI.dispatch(updateProfileReset())
})

const userLoginSlice = createSlice({
	name: 'userLogin',
	initialState: {
		loading: false,
		userInfo: null,
		error: null
	},
	reducers: {
		userLogout(state) {
			state.loading = false
			state.userInfo = null
			state.error = null
		},
		userLoginSuccess(state, action) {
			state.loading = false
			state.userInfo = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false
				state.userInfo = action.payload
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export const { userLoginSuccess } = userLoginSlice.actions
export default userLoginSlice.reducer
