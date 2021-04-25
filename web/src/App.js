import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import Header from './Components/Header'
import Footer from './Components/Footer'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ProfileScreen from './Screens/ProfileScreen'
import ShippingScreen from './Screens/ShippingScreen'
import PaymentScreen from './Screens/PaymentScreen'
import PlaceOrderScreen from './Screens/PlaceOrderScreen'
import OrderScreen from './Screens/OrderScreen'
import UserListScreen from './Screens/UserListScreen'
import UserEditScreen from './Screens/UserEditScreen'
import ProductListScreen from './Screens/ProductListScreen'
import ProductEditScreen from './Screens/ProductEditScreen'
import OrderListScreen from './Screens/OrderListScreen'

const App = () => {
	const userLoginState = useSelector((state) => state.userLogin)
	const isAdmin = userLoginState?.userInfo?.isAdmin ?? false

	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Switch>
						<Route path='/login' component={LoginScreen} />
						<Route path='/register' component={RegisterScreen} />
						<Route path='/profile' component={ProfileScreen} />
						<Route path='/product/:id' component={ProductScreen} />
						<Route path='/cart/:id?' component={CartScreen} />
						<Route path='/shipping' component={ShippingScreen} />
						<Route path='/payment' component={PaymentScreen} />
						<Route path='/placeorder' component={PlaceOrderScreen} />
						<Route path='/order/:id?' component={OrderScreen} />
						<Route
							path='/admin/userlist'
							render={(routeProps) =>
								isAdmin ? (
									<UserListScreen {...routeProps} />
								) : (
									<Redirect to='/' />
								)
							}
						/>
						<Route
							path='/admin/user/:id/edit'
							render={(routeProps) =>
								isAdmin ? (
									<UserEditScreen {...routeProps} />
								) : (
									<Redirect to='/' />
								)
							}
						/>
						<Route
							path='/admin/productlist/:pageNumber?'
							render={(routeProps) =>
								isAdmin ? (
									<ProductListScreen {...routeProps} />
								) : (
									<Redirect to='/' />
								)
							}
						/>
						<Route
							path='/admin/product/:id/edit'
							render={(routeProps) =>
								isAdmin ? (
									<ProductEditScreen {...routeProps} />
								) : (
									<Redirect to='/' />
								)
							}
						/>
						<Route
							path='/admin/orderlist'
							render={(routeProps) =>
								isAdmin ? (
									<OrderListScreen {...routeProps} />
								) : (
									<Redirect to='/' />
								)
							}
						/>
						<Route path='/search/:keyword' component={HomeScreen} exact />
						<Route
							path='/search/:keyword/page/:pageNumber'
							component={HomeScreen}
						/>
						<Route path='/page/:pageNumber' component={HomeScreen} />
						<Route path='/' exact component={HomeScreen} />
					</Switch>
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App
