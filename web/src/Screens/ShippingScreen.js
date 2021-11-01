import React, { useState, useCallback } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../Components/FormContainer'
import { useHistory } from 'react-router-dom'
import { saveShippingAddress } from '../store/cart/cartSlice'
import CheckoutSteps from '../Components/CheckoutSteps'

const ShippingScreen = () => {
	const { shippingAddress } = useSelector((state) => state.cart)

	const [address, setAddress] = useState(shippingAddress?.address)
	const [city, setCity] = useState(shippingAddress?.city)
	const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode)
	const [country, setCountry] = useState(shippingAddress?.country)

	const history = useHistory()

	const dispatch = useDispatch()

	const submitHandler = useCallback(
		(e) => {
			e.preventDefault()
			dispatch(saveShippingAddress({ address, city, postalCode, country }))
			history.push('/payment')
		},
		[dispatch, address, city, postalCode, country, history]
	)

	return (
		<>
			<CheckoutSteps step1 step2 />
			<FormContainer>
				<h1>Shipping</h1>
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='address'>
						<Form.Label>Address</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter your Address'
							value={address}
							required
							onChange={(e) => setAddress(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='city'>
						<Form.Label>City</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter your City'
							value={city}
							required
							onChange={(e) => setCity(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='postalCode'>
						<Form.Label>Postal Code</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter your Postal Code'
							value={postalCode}
							onChange={(e) => setPostalCode(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='country'>
						<Form.Label>Country</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter your Country'
							value={country}
							onChange={(e) => setCountry(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Button type='submit' variant='primary'>
						Continue
					</Button>
				</Form>
			</FormContainer>
		</>
	)
}

export default ShippingScreen
