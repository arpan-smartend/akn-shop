import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { fetchAllUsers } from '../store/user/userListSlice'
import { deleteUser } from '../store/user/userDeleteSlice'

const UserListScreen = () => {
	const dispatch = useDispatch()
	const { loading, users, error } = useSelector((state) => state.userList)
	const { success } = useSelector((state) => state.userDelete)

	useEffect(() => {
		dispatch(fetchAllUsers())
	}, [dispatch])

	useEffect(() => {
		if (success) {
			dispatch(fetchAllUsers())
		}
	}, [dispatch, success])

	const deleteHandler = (id) => {
		window.confirm('Are you sure ?') && dispatch(deleteUser(id))
	}

	const displayUsers = () => {
		if (!users.length) {
			return <Message>No users have registered yet</Message>
		} else {
			const usersList = users.map((user) => (
				<tr key={user._id}>
					<td>{user._id}</td>
					<td>{user.name}</td>
					<td>
						<a href={`mailto:${user.email}`}>{user.email}</a>
					</td>
					<td>
						{user.isAdmin ? (
							<i className='fas fa-check' style={{ color: 'green' }}></i>
						) : (
							<i className='fas fa-times' style={{ color: 'red' }}></i>
						)}
					</td>
					<td>
						<LinkContainer to={`/admin/user/${user._id}/edit`}>
							<Button variant='light' className='btn-sm'>
								<i className='fas fa-edit'></i>
							</Button>
						</LinkContainer>
						<Button
							variant='danger'
							className='btn-sm'
							onClick={() => deleteHandler(user._id)}
						>
							<i className='fas fa-trash'></i>
						</Button>
					</td>
				</tr>
			))

			return (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Admin</th>
							<th></th>
						</tr>
					</thead>
					<tbody>{usersList}</tbody>
				</Table>
			)
		}
	}

	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				displayUsers()
			)}
		</>
	)
}

export default UserListScreen
