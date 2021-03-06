import React from 'react';
import {Table, Button, MediaBox, Row, Col, Modal, Input} from 'react-materialize';

export default class Cart extends React.Component {
	constructor(props){
		super(props);
		this.state={cart: []};

		if (this.props.user !== null)
			this.getCart(this.props.user.username).then(item => this.setState({cart: item}));

		this.deleteAllItems = this.deleteAllItems.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.checkoutCart = this.checkoutCart.bind(this);
		this.itemId = '';
	}

	render(){
		const isLoggedIn = (this.props.user !== null);
		let cart = [];
		let total = 0;
		// If the user is logged in, gets it's lists
		if (isLoggedIn) cart = this.state.cart;

		let cartTable = cart.map((product) => {
			total += parseInt(product.value.price, 10) * parseInt(product.value.quantity, 10);
			return (
				<tr>
					{/*Product picture*/}
					<td><MediaBox src={product.value.img_file} caption="Product picture" width="150"/></td>
					{/*Product name*/}
					<td>{product.value.name}</td>
					{/*Quantity*/}
					<td><Input type="number" label="Quantity" min="1" max="100" defaultValue={product.value.quantity}
							onChange={(e) => {
								product.value.quantity = Number(e.target.value).toString();
								var url = 'http://127.0.0.1:4000/cart/';
								fetch(url, {
									headers: {
										'Content-type':'application/json'
									},
									method:'PUT',
									body: JSON.stringify(product)
								}).then(() => {
									this.getCart(this.props.user.username).then(item => this.setState({cart: item}));
								});

								}
							}/></td>
					{/*Price*/}
					<td>$ {Number(product.value.price * product.value.quantity).toFixed(2)}</td>

					{/*Details option*/}
					<td>
						<Modal
						header={product.value.name}
						trigger={<Button>Delete</Button>}>
							{/*Pop-up window with more details*/}
							<Row>
								{/*Larger pet picture*/}
								<Col l={4}>
									<MediaBox src={product.value.img_file} caption="Product picture" width="200"/>
								</Col>
								{/*Pet info*/}
								<Col l={4}>
									<h5>Product:</h5>
									<p>{product.value.name}</p>
									<h5>Description:</h5>
									<p>{product.value.description}</p>
									<h5>Quantity:</h5>
									<p>{product.value.quantity}</p>
									<h5>Total price:</h5>
									<p>${Number(product.value.price * product.value.quantity).toFixed(2)}</p>
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

				<Row>
					<Col>
						<Button onClick={this.deleteAllItems}>Clear Cart</Button>
					</Col>
					<Col>
						<Modal
						header='Checkout'
						trigger={<Button className="sleek-grey">Checkout</Button>}>
							<h5>Number of items:</h5>
							<p>{cart.length}</p>
							<h5>Total:</h5>
							<p>${total}</p>
							<Row>
								<Input id="user_card_name" s={6} m={6} l={6} type="text" label="Name on the card" validate/>
								<Input id="card_number" s={6} m={6} l={6} type="text" label="Card Number" validate/>
								<Input id="expiration_date" s={6} m={6} l={6} type="date" label="Expiration Date" validate/>
								<Input id="security_number" s={6} m={6} l={6} type="number" label="Security Number" validate/>
							</Row>
							<Button className="sleek-grey" modal="close" onClick={()=>{this.checkoutCart(this.props.user.username)}}>Pay</Button>
						</Modal>
					</Col>
				</Row>
			</div>
		);

	}

	async checkoutCart(username){
		let cart_for_user = await this.getCart(this.props.user.username);
		let today = new Date();
		let month=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		let dd = today.getDate();
		if(dd < 10) {
		    dd = '0'+dd
		}

		// 12 June, 2018 05:00PM
		let date = dd + ' ' + month[today.getMonth()] + ', ' + today.getFullYear() + ' '  + today.getHours() + ":" + today.getMinutes() + 'PM';
		let sales = cart_for_user.map((item)=>{
			let newSale = {
				product:item.value.name,
				username:item.value.username,
				quantity:item.value.quantity,
				price:item.value.price,
				date:date
			}
			return newSale;
		});
		let url = 'http://127.0.0.1:4000/sale';
		for (let i in sales){
			console.log(sales[i])
			await fetch(url, {
					headers: {
					  'Content-type':'application/json'
					},
					method:'POST',
					body: JSON.stringify(sales[i])
				});
		}

		window.Materialize.toast('Compra realizada com sucesso!', 4000);
		this.deleteAllItems();
	}

	async getCart(username){
		let response = await fetch('http://localhost:4000/cart');
		let carts = await response.json();
		let cart_from_user = carts.filter((carts) => {
			return carts.value.username === username
		});
		return cart_from_user;
	}

	deleteAllItems(){
		this.getCart(this.props.user.username).then( cart => {
			cart.forEach(item =>{
				var url = 'http://127.0.0.1:4000/cart/'+item.id;
				fetch(url, {method: 'delete'}).then(()=>{
					this.getCart(this.props.user.username).then(item => this.setState({ cart: item }));
				});
			});
		});
	}

	deleteItem(){
		var url = 'http://127.0.0.1:4000/cart/'+this.itemId;
		fetch(url, {method: 'delete'}).then(()=>{
			this.getCart(this.props.user.username).then(item => this.setState({ cart: item }));
		});
	}

}