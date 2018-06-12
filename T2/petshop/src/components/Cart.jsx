import React from 'react';
import {Table, Button, MediaBox, Row, Col, Modal, Input} from 'react-materialize';

export default class Cart extends React.Component {
	constructor(props){
		super(props);
		this.state={cart: []};
		
		if (this.props.user !== null)
			this.props.db.getCart(this.props.user.username).then(item => this.setState({cart: item}));
		
		this.deleteItem = this.deleteItem.bind(this);
		this.itemId = '';
	}

	render(){
		const isLoggedIn = (this.props.user !== null);
		let cart = [];
		let total = 0;
		// If the user is logged in, gets it's lists
		if (isLoggedIn) cart = this.state.cart;

		let cartTable = cart.map((product) => {
			total += parseInt(product.price, 10) * parseInt(product.quantity, 10);
			// this.itemId = product.id;

			return (
				<tr>
					{/*Product picture*/}
					<td><MediaBox src={product.picture} caption="Product picture" width="150"/></td>
					{/*Product name*/}
					<td>{product.name}</td>
					{/*Quantity*/}
					<td><Input type="number" label="Quantity" min="1" max="100" defaultValue={product.quantity}
							onChange={(e) => {
								this.props.db.updateCartProduct(product.id, Number(e.target.value)).then(
									this.props.db.getCart(this.props.user.username).then(item => this.setState({cart: item})))
								}
							}/></td>
					{/*Price*/}
					<td>$ {Number(product.price * product.quantity).toFixed(2)}</td>
					{console.log("quantity = " + product.quantity)}

					{/*Details option*/}
					<td>
						<Modal
						header={product.name}
						trigger={<Button>Delete</Button>}>
							{/*Pop-up window with more details*/}
							<Row>
								{/*Larger pet picture*/}
								<Col l={4}>
									<MediaBox src={product.picture} caption="Product picture" width="200"/>
								</Col>
								{/*Pet info*/}
								<Col l={4}>
									<h5>Product:</h5>
									<p>{product.name}</p>
									<h5>Description:</h5>
									<p>{product.description}</p>
									<h5>Quantity:</h5>
									<p>{product.quantity}</p>
									<h5>Total price:</h5>
									<p>${Number(product.price * product.quantity).toFixed(2)}</p>
								</Col>
							</Row>
							{/*Delete option*/}
							<Row className="left">
								<Button modal="close" onClick={() => {this.itemId = product.id; this.deleteItem()} }>
									Delete
								</Button>
							</Row>
						</Modal>
					</td>
				</tr>
			)
		});

		return(
			<div>
				<Table>
					<thead>
						{/*Colum names*/}
						<tr>
							<th data-field="img">Product</th>
							<th data-field="name">Name</th>
							<th data-field="quantity">Quantity</th>
							<th data-field="price">Total price</th>
							<th data-field="checkout"></th>
						</tr>
					</thead>
					<tbody>
						{cartTable}
					</tbody>
				</Table>
				<Modal
				header='Checkout'
				trigger={<Button className="sleek-grey">Checkout</Button>}>
					<h5>Number of items:</h5>
					<p>{cart.length}</p>
					<h5>Total:</h5>
					<p>${total}</p>
					<Button className="sleek-grey">Pay</Button>
				</Modal>
			</div>
		);

	}

	deleteItem(){
		this.props.db.deleteFromCart(this.itemId).then(
			this.props.db.getCart(this.props.user.username).then(item => this.setState({cart: item}))
		)
	}

}