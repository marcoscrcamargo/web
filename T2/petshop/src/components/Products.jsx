import React from 'react';
import {Row, Col, Card, CardTitle} from 'react-materialize';

export default class Products extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			products: [],
		};
		this.props.db.getAllProducts().then(item => this.setState({ products: item }));
	}

	render() {
		let products = this.state.products;

		let productList = products.map((prod, index) => {
				return (
					<Col s={6} m={4} l={2} >
						<Card className='medium'
							header={<CardTitle image={prod.img_file}></CardTitle>}
							actions={[<a href=''>{prod.price} Buy</a>]}>
							<h5>{prod.name}</h5>
							{prod.description}.
						</Card>
					</Col>)
			});

		return (
			<Row>
				{productList}
			</Row>
		);
	}
}