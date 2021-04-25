import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = ({ buttonLoader }) => {
	return (
		<Spinner
			animation='border'
			role='status'
			style={{
				width: buttonLoader ? '20px' : '100px',
				height: buttonLoader ? '20px' : '100px',
				margin: 'auto',
				display: 'block'
			}}
		>
			<span className='sr-only'>Loading...</span>
		</Spinner>
	)
}

export default Loader
