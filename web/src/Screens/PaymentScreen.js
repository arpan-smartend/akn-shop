import React, { useState, useCallback } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../Components/FormContainer'
import { useHistory } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../Components/CheckoutSteps'

const PaymentScreen = () => {
	const { shippingAddress } = useSelector((state) => state.cart)

	const [paymentMethod, setPaymentMethod] = useState('PayPal')

	const history = useHistory()

	const dispatch = useDispatch()

	if (!shippingAddress) {
		history.push('/shipping')
	}

	const submitHandler = useCallback(
		(e) => {
			e.preventDefault()
			dispatch(savePaymentMethod(paymentMethod))
			history.push('/placeorder')
		},
		[dispatch, history, paymentMethod]
	)

	return (
		<>
			<CheckoutSteps step1 step2 step3 />
			<FormContainer>
				<h1>Payment Method</h1>
				<Form onSubmit={submitHandler}>
					<Form.Group>
						<Form.Label as='legend'>Select Payment Method</Form.Label>

						<Col className='mb-3'>
							<Form.Check
								type='radio'
								label='Paypal or Credit Card'
								id='PayPal'
								name='paymentMethod'
								value='PayPal'
								checked
								onChange={(e) => setPaymentMethod(e.target.value)}
							></Form.Check>
							<Form.Check
								type='radio'
								label='Pay using UPI'
								id='Upi'
								name='paymentMethod'
								value='Upi'
								onChange={(e) => setPaymentMethod(e.target.value)}
							></Form.Check>
						</Col>
					</Form.Group>
					<Button type='submit' variant='primary'>
						Continue
					</Button>
				</Form>
			</FormContainer>
		</>
	)
}

export default PaymentScreen
