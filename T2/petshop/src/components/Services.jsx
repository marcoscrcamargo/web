import React from 'react';
import {Row, Col, Card, CardTitle} from 'react-materialize';

export default class Services extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			services: [],
		};
		this.props.db.getAllServices().then(item => this.setState({ services: item }));
	}

	render() {
		let services = this.state.services;

		// fills a list with cards with name, image, price and a short description about each service
		let serviceList = services.map((service) => {
				return (
					<Col s={6} m={4} l={3}>
						<Card className='medium'
							/*Service image*/
							header={<CardTitle image={service.img_file}></CardTitle>}
							/*Price/schedule (clickable) */
							actions={[<a href=''>{service.price} Schedule</a>]}>
							{/*Service name*/}
							<h5>{service.title}</h5>
							{/*Service description*/}
							{service.description}
						</Card>
					</Col>)
			});

		// returns the list of cards
		return (
			<Row>
				{serviceList}
			</Row>
		);
	}
}