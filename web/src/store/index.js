import { configureStore } from '@reduxjs/toolkit'
import productListReducer from './product/productListSlice'
import productDetailsReducer from './product/productDetailsSlice'
import productDeleteReducer from './product/productDeleteSlice'
import productCreateReducer from './product/productCreateSlice'
import productUpdateReducer from './product/productUpdateSlice'
import productCreateReviewReducer from './product/productCreateReviewSlice'
import productTopRatedReducer from './product/productTopRatedSlice'
import userLoginReducer from './user/userLoginSlice'
import userRegisterReducer from './user/userRegisterSlice'
import userDetailsReducer from './user/userDetailsSlice'
import userUpdateProfileReducer from './user/userUpdateProfileSlice'
import userListReducer from './user/userListSlice'
import userDeleteReducer from './user/userDeleteSlice'
import userUpdateReducer from './user/userUpdateSlice'
import cartReducer from './cart/cartSlice'
import orderCreateReducer from './order/orderCreateSlice'
import orderDetailsReducer from './order/orderDetailsSlice'
import orderPayReducer from './order/orderPaySlice'
import orderDeliverReducer from './order/orderDeliverSlice'
import orderFetchMyOrdersReducer from './order/orderFetchMyOrdersSlice'
import orderFetchAllOrdersReducer from './order/orderFetchAllOrdersSlice'

const userInfoFromStorage = localStorage.getItem('userInfo')
	? {
			loading: false,
			userInfo: JSON.parse(localStorage.getItem('userInfo')),
			error: null
	  }
	: {
			loading: false,
			userInfo: null,
			error: null
	  }

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: null

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
	? JSON.parse(localStorage.getItem('paymentMethod'))
	: null

const store = configureStore({
	reducer: {
		productList: productListReducer,
		productDetails: productDetailsReducer,
		productDelete: productDeleteReducer,
		productCreate: productCreateReducer,
		productUpdate: productUpdateReducer,
		productCreateReview: productCreateReviewReducer,
		productTopRated: productTopRatedReducer,
		userLogin: userLoginReducer,
		userRegister: userRegisterReducer,
		userDetails: userDetailsReducer,
		userUpdateProfile: userUpdateProfileReducer,
		userList: userListReducer,
		userDelete: userDeleteReducer,
		userUpdate: userUpdateReducer,
		cart: cartReducer,
		orderCreate: orderCreateReducer,
		orderDetails: orderDetailsReducer,
		orderPay: orderPayReducer,
		orderDeliver: orderDeliverReducer,
		orderFetchMyOrders: orderFetchMyOrdersReducer,
		orderFetchAllOrders: orderFetchAllOrdersReducer
	},
	preloadedState: {
		userLogin: userInfoFromStorage,
		cart: {
			cartItems: cartItemsFromStorage,
			shippingAddress: shippingAddressFromStorage,
			paymentMethod: paymentMethodFromStorage
		}
	}
})

export default store
