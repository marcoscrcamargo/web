import React from 'react';
import {Container, Row, Col, Card, CardTitle} from 'react-materialize';

export default class Products extends React.Component {
	render() {
		let products = [
			{
				img_file: require('../img/prod.jpg'),
				description: 'Ração pra animal doente1',
				price: '55.00'
			},
			{
				img_file: require('../img/prod.jpg'),
				description: 'Ração pra animal doente2',
				price: '35.00'
			},
			{
				img_file: require('../img/prod.jpg'),
				description: 'Ração pra animal doente1',
				price: '55.00'
			},

		];

		let productList = products.map(function(prod) {
				return (
					<Col s={2}>
						<Card className='small'
							header={<CardTitle image={prod.img_file}></CardTitle>}
							actions={[<a href='#'>{prod.price} Buy</a>]}>
							{prod.description}.
						</Card>
					</Col>)
			});

		return (
			<Container>
				<Row>
					{productList}
				</Row>
			</Container>
		);
	}
}