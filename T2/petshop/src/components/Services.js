import React from 'react';
import {Container, Row, Col, Card, CardTitle} from 'react-materialize';

export default class Services extends React.Component {
	render() {
		let services = [
			{
				title: 'Grooming',
				img_file: require('../img/tosa.jpg'),
				description: "We have the best professionals to take care of your pet's hair!",
				price: '$10.00'
			},
			{
				title: 'Castration',
				img_file: require('../img/castracao.jpg'),
				description: 'We have the best doctors to make the procedure safely!',
				price: '$80.00'
			},
			{
				title: 'Bath',
				img_file: require('../img/banho.jpg'),
				description: 'We leave your pet clean and smelling good for a fair price!',
				price: '15.00'
			},
			{
				title: 'Vaccination',
				img_file: require('../img/vacinacao.jpg'),
				description: 'We apply vaccines to keep your pet always protected and healthy!',
				price: '20.00'
			},

		];

		let serviceList = services.map((service) => {
				return (
					<Col s={6} m={4} l={3}>
						<Card className='medium'
							header={<CardTitle image={service.img_file}></CardTitle>}
							actions={[<a href=''>{service.price} Schedule</a>]}>
							<h5>{service.title}</h5>
							{service.description}.
						</Card>
					</Col>)
			});

		return (
			<Container>
				<Row>
					{serviceList}
				</Row>
			</Container>
		);
	}
}