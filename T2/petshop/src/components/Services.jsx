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

		let serviceList = services.map((service) => {
				return (
					<Col s={6} m={4} l={3}>
						<Card className='medium'
							header={<CardTitle image={service.img_file}></CardTitle>}
							actions={[<a href=''>{service.price} Schedule</a>]}>
							<h5>{service.title}</h5>
							{service.description}
						</Card>
					</Col>)
			});

		return (
			<Row>
				{serviceList}
			</Row>
		);
	}
}