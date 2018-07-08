import React from 'react';
import {Row, Col, Card, CardTitle, Button, Modal, MediaBox, Input} from 'react-materialize';

export default class Products extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			products: [],
			quantity: 1,
		};
		// this.props.db.getAllProducts().then(item => this.setState({ products: item }));
		this.getAllProducts().then(item => this.setState({ products: item }));
		this.prodToCard = null;
		this.createNewItem = this.createNewItem.bind(this);
		this.setState({quantity: 1})
	}

	render() {
		let products = this.state.products;
		console.log(products)
		if(this.props.user === null){
			let productList = products.map((prod) => {
					prod = prod.value;
					return (
						<Col s={6} m={4} l={3} >
							<Card /*type of the card*/
								header={<CardTitle image={prod.img_file}></CardTitle>} /*adding an image*/
								actions={<Modal
									header={prod.name}
									trigger={<p className="center" style={{'margin': '0 0 0 0'}}><a>Buy for ${prod.price} </a></p>}>
										Please login first!
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
		else{
			// fills a list with cards with name, image, price and a short description about each product
			let productList = products.map((prod, index) => {
					prod = prod.value;
					return (
						// sets the size of the card for each type of screen
						<Col s={6} m={4} l={3} >
							<Card /*type of the card*/
								header={<CardTitle image={prod.img_file}></CardTitle>} /*adding an image*/
								actions={<Modal
									header={prod.name}
									trigger={<p className="center"><a>Buy for ${prod.price} </a></p>}>
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
												<p>${Number(this.state.quantity*prod.price).toFixed(2)}</p>
												<Input type="number" label="Quantity" min="1" max="100" defaultValue="1"
													onChange={(e) => {this.setState({quantity: e.target.value})} }/>
											</Col>
										</Row>
										{/*Delete option*/}
										<Row className="left">
											<Button modal="close" onClick={ () => {
												this.prodToCart = prod;
												this.createNewItem();
											}
											}>
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
	}

	async getAllProducts(){
		let response = await fetch('http://localhost:4000/product');
		let products = await response.json();
		return products;
	}

	createNewItem(){
		console.log(this.prodToCart.img_file)
		let newItem = {
			username: this.props.user.username,
			productId: this.prodToCart._id,
			name: this.prodToCart.name,
			img_file: this.prodToCart.img_file,
			description: this.prodToCart.description,
			price: this.prodToCart.price,
			quantity: this.state.quantity
		}
		var url = 'http://127.0.0.1:4000/cart';
		fetch(url, {
			headers: {
				'Content-type':'application/json'
			},
			method:'POST',
			body: JSON.stringify(newItem)
		}).then(() => {
			window.Materialize.toast("Added to cart!", 2000);
			this.setState({quantity: 1})
		});
	}
}