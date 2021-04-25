import * as userConstants from '../constants/userConstants'

const initialStateForUserLoginReducer = {
	loading: false,
	userInfo: null,
	error: null
}

const userLoginRequest = (state) => ({
	...state,
	loading: true,
	error: null
})
const userLoginSuccess = (state, payload) => ({
	...state,
	loading: false,
	error: null,
	userInfo: payload
})
const userLoginFail = (state, payload) => ({
	...state,
	loading: false,
	error: payload
})

const userLogout = () => ({
	...initialStateForUserLoginReducer
})

export const userLoginReducer = (
	state = initialStateForUserLoginReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case userConstants.USER_LOGIN_REQUEST:
			return userLoginRequest(state)

		case userConstants.USER_LOGIN_SUCCESS:
			return userLoginSuccess(state, payload)

		case userConstants.USER_LOGIN_FAIL:
			return userLoginFail(state, payload)

		case userConstants.USER_LOGOUT:
			return userLogout()

		default:
			return state
	}
}

const initialStateForUserRegisterReducer = {
	loading: false,
	userInfo: null,
	error: null
}

const userRegisterRequest = (state) => ({
	...state,
	loading: true,
	error: null
})
const userRegisterSuccess = (state, payload) => ({
	...state,
	loading: false,
	error: null,
	userInfo: payload
})
const userRegisterFail = (state, payload) => ({
	...state,
	loading: false,
	error: payload
})
const userRegisterReset = () => ({
	...initialStateForUserRegisterReducer
})

export const userRegisterReducer = (
	state = initialStateForUserRegisterReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case userConstants.USER_REGISTER_REQUEST:
			return userRegisterRequest(state)

		case userConstants.USER_REGISTER_SUCCESS:
			return userRegisterSuccess(state, payload)

		case userConstants.USER_REGISTER_FAIL:
			return userRegisterFail(state, payload)

		case userConstants.USER_REGISTER_RESET:
			return userRegisterReset()

		default:
			return state
	}
}

const initialStateForUserDetailsReducer = {
	loading: false,
	user: null,
	error: null
}

const userDetailsRequest = (state) => ({
	...state,
	loading: true,
	error: null
})
const userDetailsSuccess = (state, payload) => ({
	...state,
	loading: false,
	error: null,
	user: payload
})
const userDetailsFail = (state, payload) => ({
	...state,
	loading: false,
	error: payload
})
const userDetailsReset = () => ({
	...initialStateForUserDetailsReducer
})

export const userDetailsReducer = (
	state = initialStateForUserDetailsReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case userConstants.USER_DETAILS_REQUEST:
			return userDetailsRequest(state)

		case userConstants.USER_DETAILS_SUCCESS:
			return userDetailsSuccess(state, payload)

		case userConstants.USER_DETAILS_FAIL:
			return userDetailsFail(state, payload)

		case userConstants.USER_DETAILS_RESET:
			return userDetailsReset()

		default:
			return state
	}
}

const initialStateForUserUpdateProfileReducer = {
	loading: false,
	userInfo: null,
	error: null,
	success: false
}

const userUpdateProfileRequest = (state) => ({
	...state,
	loading: true,
	error: null
})
const userUpdateProfileSuccess = (state, payload) => ({
	...state,
	loading: false,
	error: null,
	userInfo: payload,
	success: true
})
const userUpdateProfileFail = (state, payload) => ({
	...state,
	loading: false,
	error: payload,
	success: false
})
const userUpdateProfileReset = () => ({
	...initialStateForUserUpdateProfileReducer
})

export const userUpdateProfileReducer = (
	state = initialStateForUserUpdateProfileReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case userConstants.USER_UPDATE_PROFILE_REQUEST:
			return userUpdateProfileRequest(state)

		case userConstants.USER_UPDATE_PROFILE_SUCCESS:
			return userUpdateProfileSuccess(state, payload)

		case userConstants.USER_UPDATE_PROFILE_FAIL:
			return userUpdateProfileFail(state, payload)

		case userConstants.USER_UPDATE_PROFILE_RESET:
			return userUpdateProfileReset()

		default:
			return state
	}
}

const initialStateForUserListReducer = {
	loading: false,
	users: [],
	error: null
}

const userListRequest = (state) => ({
	...state,
	loading: true,
	error: null
})
const userListSuccess = (state, payload) => ({
	...state,
	loading: false,
	error: null,
	users: payload
})
const userListFail = (state, payload) => ({
	...state,
	loading: false,
	error: payload
})

export const userListReducer = (
	state = initialStateForUserListReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case userConstants.USER_LIST_REQUEST:
			return userListRequest(state)

		case userConstants.USER_LIST_SUCCESS:
			return userListSuccess(state, payload)

		case userConstants.USER_LIST_FAIL:
			return userListFail(state, payload)

		default:
			return state
	}
}

const initialStateForUserDeleteReducer = {
	loading: true,
	success: false,
	message: null,
	error: null
}

const userDeleteRequest = (state) => ({
	...state,
	loading: true,
	success: false,
	error: null
})
const userDeleteSuccess = (state, payload) => ({
	...state,
	loading: false,
	error: null,
	success: true,
	message: payload
})
const userDeleteFail = (state, payload) => ({
	...state,
	loading: false,
	success: false,
	error: payload
})

export const userDeleteReducer = (
	state = initialStateForUserDeleteReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case userConstants.USER_DELETE_REQUEST:
			return userDeleteRequest(state)

		case userConstants.USER_DELETE_SUCCESS:
			return userDeleteSuccess(state, payload)

		case userConstants.USER_DELETE_FAIL:
			return userDeleteFail(state, payload)

		default:
			return state
	}
}

const initialStateForUserUpdateReducer = {
	loading: false,
	error: null,
	success: false
}

const userUpdateRequest = (state) => ({
	...state,
	loading: true,
	error: null
})
const userUpdateSuccess = (state) => ({
	...state,
	loading: false,
	error: null,
	success: true
})
const userUpdateFail = (state, payload) => ({
	...state,
	loading: false,
	error: payload,
	success: false
})
const userUpdateReset = () => ({
	...initialStateForUserUpdateReducer
})

export const userUpdateReducer = (
	state = initialStateForUserUpdateReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case userConstants.USER_UPDATE_REQUEST:
			return userUpdateRequest(state)

		case userConstants.USER_UPDATE_SUCCESS:
			return userUpdateSuccess(state, payload)

		case userConstants.USER_UPDATE_FAIL:
			return userUpdateFail(state, payload)

		case userConstants.USER_UPDATE_RESET:
			return userUpdateReset()

		default:
			return state
	}
}
