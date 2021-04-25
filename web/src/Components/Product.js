import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({
	product: { _id, image, name, rating, numReviews, price }
}) => {
	return (
		<Card
			className='my-3 p-3 rounded'
			style={{ maxHeight: '35em', minWidth: '20em' }}
		>
			<Link to={`/product/${_id}`}>
				<Card.Img
					src={image}
					variant='top'
					style={{
						width: '100%',
						height: '300px',
						maxHeight: '300px',
						objectFit: 'cover'
					}}
				/>
			</Link>

			<Card.Body>
				<Link to={`/product/${_id}`}>
					<Card.Title as='div'>
						<strong>{name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as='div'>
					<Rating value={rating} text={`${numReviews} reviews`} />
				</Card.Text>

				<Card.Text as='h3'>&#x20B9;{price}</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Product
