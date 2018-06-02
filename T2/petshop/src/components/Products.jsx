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

		// fills a list with cards with name, image, price and a short description about each product
		let productList = products.map((prod, index) => {
				return (
					// sets the size of the card for each type of screen
					<Col s={6} m={4} l={2} >
						<Card className='medium' /*type of the card*/
							header={<CardTitle image={prod.img_file}></CardTitle>} /*adding an image*/
							actions={[<a href=''>{prod.price} Buy</a>]}> {/*adding a "Buy" button with the price*/}
							{/*name and description: */}
							<h5>{prod.name}</h5>
							{prod.description}.
						</Card>
					</Col>)
			});

		// returns the list of cards
		return (
			<Row>
				{productList}
			</Row>
		);
	}
}