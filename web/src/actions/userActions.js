import axios from 'axios'
import * as userConstants from '../constants/userConstants'

const user_login_request = () => ({
	type: userConstants.USER_LOGIN_REQUEST
})

const user_login_success = (payload) => ({
	type: userConstants.USER_LOGIN_SUCCESS,
	payload
})

const user_login_fail = (payload) => ({
	type: userConstants.USER_LOGIN_FAIL,
	payload
})

const user_logout = () => ({
	type: userConstants.USER_LOGOUT
})

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch(user_login_request())
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

		dispatch(user_login_success(data))
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		const errMsg = error.response.data.message ?? error.message
		dispatch(user_login_fail(errMsg))
	}
}

const user_register_request = () => ({
	type: userConstants.USER_REGISTER_REQUEST
})
const user_register_success = (payload) => ({
	type: userConstants.USER_REGISTER_SUCCESS,
	payload
})

const user_register_fail = (payload) => ({
	type: userConstants.USER_REGISTER_FAIL,
	payload
})

const user_register_reset = () => ({
	type: userConstants.USER_REGISTER_RESET
})

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch(user_register_request())
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
		dispatch(user_register_success(data))
		dispatch(user_login_success(data))
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		const errMsg = error.response.data.message ?? error.message
		dispatch(user_register_fail(errMsg))
	}
}

const user_details_request = () => ({
	type: userConstants.USER_DETAILS_REQUEST
})
const user_details_success = (payload) => ({
	type: userConstants.USER_DETAILS_SUCCESS,
	payload
})

const user_details_fail = (payload) => ({
	type: userConstants.USER_DETAILS_FAIL,
	payload
})

const user_details_reset = () => ({
	type: userConstants.USER_DETAILS_RESET
})

export const userDetails = (id) => async (dispatch, getState) => {
	try {
		const {
			userLogin: {
				userInfo: { token }
			}
		} = getState()

		dispatch(user_details_request())
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}
		const { data } = await axios.get(`/api/users/${id}`, config)
		dispatch(user_details_success(data))
	} catch (error) {
		const errMsg = error.response.data.message ?? error.message
		dispatch(user_details_fail(errMsg))
	}
}

const user_update_profile_request = () => ({
	type: userConstants.USER_UPDATE_PROFILE_REQUEST
})
const user_update_profile_success = (payload) => ({
	type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
	payload
})

const user_update_profile_fail = (payload) => ({
	type: userConstants.USER_UPDATE_PROFILE_FAIL,
	payload
})

const user_update_profile_reset = () => ({
	type: userConstants.USER_UPDATE_PROFILE_RESET
})

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch(user_update_profile_request())

		const {
			userLogin: {
				userInfo: { token }
			}
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}
		const { data } = await axios.put(`/api/users/profile`, user, config)
		dispatch(user_update_profile_success(data))
		dispatch(user_login_success(data))
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		const errMsg = error.response.data.message ?? error.message
		dispatch(user_update_profile_fail(errMsg))
	}
}

export const updateProfileReset = () => (dispatch) => {
	dispatch(user_update_profile_reset())
}

export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo')
	localStorage.removeItem('cartItems')
	dispatch(user_logout())
	dispatch(user_register_reset())
	dispatch(user_details_reset())
	dispatch(user_update_profile_reset())
}

const user_list_request = () => ({
	type: userConstants.USER_LIST_REQUEST
})

const user_list_success = (payload) => ({
	type: userConstants.USER_LIST_SUCCESS,
	payload
})

const user_list_fail = (payload) => ({
	type: userConstants.USER_LIST_FAIL,
	payload
})

export const fetchAllUsers = () => async (dispatch, getState) => {
	try {
		dispatch(user_list_request())
		const {
			userLogin: {
				userInfo: { token }
			}
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}

		const { data } = await axios.get('/api/users', config)
		dispatch(user_list_success(data))
	} catch (error) {
		const errMsg = error.response.data.message ?? error.message
		dispatch(user_list_fail(errMsg))
	}
}

const user_delete_request = () => ({
	type: userConstants.USER_DELETE_REQUEST
})

const user_delete_success = (payload) => ({
	type: userConstants.USER_DELETE_SUCCESS,
	payload
})

const user_delete_fail = (payload) => ({
	type: userConstants.USER_DELETE_FAIL,
	payload
})

export const deleteUser = (userId) => async (dispatch, getState) => {
	try {
		dispatch(user_delete_request())
		const {
			userLogin: {
				userInfo: { token }
			}
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}

		const { data } = await axios.delete(`/api/users/${userId}`, config)
		dispatch(user_delete_success(data))
	} catch (error) {
		const errMsg = error.response.data.message ?? error.message
		dispatch(user_delete_fail(errMsg))
	}
}

const user_update_request = () => ({
	type: userConstants.USER_UPDATE_REQUEST
})

const user_update_success = (payload) => ({
	type: userConstants.USER_UPDATE_SUCCESS,
	payload
})

const user_update_fail = (payload) => ({
	type: userConstants.USER_UPDATE_FAIL,
	payload
})

const user_update_reset = () => ({
	type: userConstants.USER_UPDATE_RESET
})

export const updateUserReset = () => (dispatch) => {
	dispatch(user_update_reset())
}

export const updateUser = (user) => async (dispatch, getState) => {
	try {
		dispatch(user_update_request())
		const {
			userLogin: {
				userInfo: { token }
			}
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}
		const { data } = await axios.put(`/api/users/${user._id}`, user, config)
		dispatch(user_update_success(data))
		dispatch(user_details_success(data))
	} catch (error) {
		const errMsg = error?.response?.data?.message ?? error?.message
		dispatch(user_update_fail(errMsg))
	}
}
