import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import FormContainer from '../Components/FormContainer'
import {
	userDetails,
	updateUser,
	updateUserReset
} from '../actions/userActions'
import { useHistory, useParams } from 'react-router-dom'

const UserEditScreen = () => {
	const { id: userId } = useParams()
	const [email, setEmail] = useState('')
	const [isAdmin, setIsAdmin] = useState(false)
	const [name, setName] = useState('')

	const dispatch = useDispatch()
	const history = useHistory()

	const { loading, error, user } = useSelector((state) => state.userDetails)
	const { loading: loadingUpdate, error: errorUpdate, success } = useSelector(
		(state) => state.userUpdate
	)

	useEffect(() => {
		if (!user || user._id !== userId) {
			dispatch(userDetails(userId))
		} else {
			setName(user.name)
			setEmail(user.email)
			setIsAdmin(user.isAdmin)
		}
	}, [user, userId, dispatch])

	useEffect(() => {
		if (success) {
			dispatch(updateUserReset())
			history.push('/admin/userlist')
		}
	}, [success, dispatch, history])

	const submitHandler = useCallback(
		(e) => {
			e.preventDefault()
			dispatch(
				updateUser({
					_id: userId,
					name,
					email,
					isAdmin
				})
			)
		},
		[dispatch, name, email, isAdmin, userId]
	)

	return (
		<>
			<Link to='/admin/userList' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter your Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter your Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='isAdmin'>
						<Form.Check
							type='checkbox'
							label='Is Admin ?'
							checked={isAdmin}
							onChange={(e) => setIsAdmin(e.target.checked)}
						></Form.Check>
					</Form.Group>

					<Button type='submit' variant='primary'>
						{loadingUpdate ? <Loader buttonLoader /> : 'Update'}
					</Button>
					{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				</Form>
			</FormContainer>
		</>
	)
}

export default UserEditScreen
