import React from 'react';
import {Row, Col, Card, CardTitle, Button, Modal, MediaBox, Input} from 'react-materialize';

export default class Products extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			products: [],
			quantity: 0,
		};
		this.props.db.getAllProducts().then(item => this.setState({ products: item }));
		this.prodId = '';
		this.prodName = '';
		this.prodImg = null;
		this.prodDescription = '';
		this.prodPrice = '';

		this.createNewItem = this.createNewItem.bind(this);
	}

	render() {
		let products = this.state.products;

		// fills a list with cards with name, image, price and a short description about each product
		let productList = products.map((prod, index) => {
				this.prodId = prod.id;
				this.prodName = prod.name;
				this.prodImg = prod.img_file;
				this.prodDescription = prod.description;
				this.prodPrice = prod.price;

				return (
					// sets the size of the card for each type of screen
					<Col s={6} m={4} l={2} >
						<Card className='medium' /*type of the card*/
							header={<CardTitle image={prod.img_file}></CardTitle>} /*adding an image*/
							actions={<Modal
								header={prod.name}
								trigger={<Button>{prod.price} Buy</Button>}>
									{/*Pop-up window with more details*/}
									<Row>
										{/*Larger product picture*/}
										<Col l={4}>
											<MediaBox src={prod.img_file} caption="Product picture" width="200"/>
										</Col>
										{/*Product info*/}
										<Col l={4}>
											<h5>Description:</h5>
											<p>{prod.description}</p>
											<h5>Total price:</h5>
											<p>{parseInt(prod.price, 10) * this.state.quantity}</p>
											<h5></h5>
											<Input type="number" label="Quantity" min="1" max="100" defaultValue="1"
												onChange={(e) => {this.setState({quantity: e.target.value})} }/>
										</Col>
									</Row>
									{/*Delete option*/}
									<Row className="left">
										<Button modal="close" onClick={this.createNewItem}>
											Add to cart
										</Button>
									</Row>
								</Modal>}> {/*adding a "Buy" button with the price*/}
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

	createNewItem(){
		let newItem = {
			username: this.props.user.username,
			productId: this.prodId,
			name: this.prodName,
			picture: this.prodImg,
			description: this.prodDescription,
			price: this.prodPrice,
			quantity: this.state.quantity
		}
		this.props.db.addToCart(newItem);
	}
}