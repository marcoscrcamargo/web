import React from 'react';

import {Tabs, Tab, Table, Button, MediaBox, Row, Col, Modal, Input} from 'react-materialize';

import { Redirect } from 'react-router';

export default class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pets: [],
			schedules: [],
			petname: '',
			createdPet: 'false',
			cart: []
		}

		this.petToDelete = null
		this.scheduleToDelete = null
		if (this.props.user !== null){
			this.props.db.getPets('username', this.props.user.username).then(pet => this.setState({ pets: pet }));
			this.props.db.getSchedule('username', this.props.user.username).then(schedule => this.setState({ schedules: schedule }));
			this.props.db.getCart(this.props.user.username).then(item => this.setState({cart: item}));
		}
		this.deletePet = this.deletePet.bind(this);
		this.deleteSchedule = this.deleteSchedule.bind(this);
		this.createNewPet = this.createNewPet.bind(this);
		this.deleteItem = this.deleteItem.bind(this);

		this.itemId = '';

	}

	render(){
		// Defines a pattern for responsive images
		let responsiveImg = {
			width: '40vw',
			minWidth: '200px',
			maxWidth: '400px',
			height: 'auto',
		}

		const isLoggedIn = (this.props.user !== null);
		let pets = [];
		let schedule = [];
		let cart = [];
		let total = 0;
		// If the user is logged in, gets it's lists
		if (isLoggedIn) {
			pets = this.state.pets;
			// pets = this.props.db.getUserPets(this.props.user.username);
			schedule = this.state.schedules;
			// cart = (this.props.user.cart) != null ? (this.props.user.cart) : [];
			cart = this.state.cart;
		}

		// Sets a list of pets as a table
		// Each row represent a pet and has image, name and a button for more details
		// When the "details" button is pressed, a pop-up window appears with a larger version
		// of the image, the name of the pet and "delete" and "close" options.
		let petsTable = pets.map((pet, index) => {
			return (
				<tr>
					{/*Pet picture*/}
					<td><MediaBox src={pet.picture} caption="Pet picture" width="150"/></td>
					{/*Pet name*/}
					<td><Col>{pet.name}</Col></td>
					{/*Details option*/}
					<td>
						<Modal
						id={"pet"+pet.id}
						header={pet.name}
						trigger={<Button className="sleek-grey">Details</Button>}>
							{/*Pop-up window with more details*/}
							<Row>
								{/*Larger pet picture*/}
								<Col l={4}>
									<MediaBox src={pet.picture} caption="Pet picture" width="200"/>
								</Col>
								{/*Pet info*/}
								<Col l={4}>
									<h5>Name:</h5>
									<p>{pet.name}</p>
								</Col>
							</Row>
							{/*Delete option*/}
							<Button className="sleek-grey" modal="close" onClick={ ()=> {
								this.petToDelete = pet;
								this.deletePet();
							}}> Delete </Button>
						</Modal>
					</td>
				</tr>
			)
		});

		let scheduleTable = schedule.map((service) => {
			return (
				<tr>
					{/*Service name*/}
					<td>{service.name}</td>
					{/*pet name*/}
					<td>{service.pet}</td>
					{/*date and time*/}
					<td>{service.date}</td>

					{/*Details option*/}
					<td>
						<Modal
						header={service.name}
						trigger={<Button className="sleek-grey">Details</Button>}>
							{/*Pop-up window with more details*/}
							<Row>
								{/*Larger pet picture*/}
								<Col l={4}>
									<MediaBox src={service.picture} caption="Service picture" width="200"/>
								</Col>
								{/*Pet info*/}
								<Col l={4}>
									<h5>Service:</h5>
									<p>{service.name}</p>
									<h5>Description:</h5>
									<p>{service.description}</p>
									<h5>Pet:</h5>
									<p>{service.pet}</p>
									<h5>Date:</h5>
									<p>{service.date}</p>
								</Col>
							</Row>
							{/*Delete option*/}
							<Row className="left"><Button className="sleek-grey" modal="close" onClick={ ()=> {
								this.scheduleToDelete = service;
								this.deleteSchedule();
							}}> Delete </Button></Row>
						</Modal>
					</td>
				</tr>
			)
		});

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
						trigger={<Button className="sleek-grey">Delete</Button>}>
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
								<Button className="sleek-grey" modal="close" onClick={() => {this.itemId = product.id; this.deleteItem()} }>
									Delete
								</Button>
							</Row>
						</Modal>
					</td>
				</tr>
			)
		});

		// If the user loggs in, a welcome message is showed
		// A new navbar appears, with the tags profile, pets, schedule and cart
		// Below the new navbar, some information about the user is showed:
		// picture, name, address, phone, email and number of pets
		if (isLoggedIn) {
			return(
				<div>
					{/*Welcome message*/}
					<Row className="center">
						<h4> Welcome {this.props.user.name} !</h4>
					</Row>
					{/*User navbar*/}
					<Tabs className='z-depth-1'>
						{/*Cart tab*/}
						<Tab title="Cart" active>
							{/*Cart table*/}
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
						</Tab>

						{/*Pets tab*/}
						<Tab title="Pets">
							{/*Pet's table*/}
							<Table>
								<thead>
									{/*Colum names*/}
									<tr>
										<th data-field="img">Specie</th>
										<th data-field="name">Name</th>
										<th data-field="details">Details</th>
									</tr>
								</thead>
								<tbody>
									{petsTable}
								</tbody>
							</Table>
							<Row></Row>
							<Row></Row>
							{/*Add new pet option*/}
							<Modal
							header='Create new pet'
							trigger={<Button className="sleek-grey">New pet</Button>}>
								<Row>
									<Input id="petname" s={6} m={6} l={6} type="text" label="Pet Name" validate/>
								</Row>
								<Row>
								    <Input id="radio_dog" name='group1' type='radio' value='dog' label='Dog' checked="true"/>
								    <Input id="radio_cat" name='group1' type='radio' value='cat' label='Cat'/>
								    <Input id="radio_bird" name='group1' type='radio' value='bird' label='Bird'/>
								    <Input id="radio_fish" name='group1' type='radio' value='fish' label='Fish'/>
								</Row>
								{/*Create button*/}
								<Row className="left"><Button className="sleek-grey" modal="close" onClick={this.createNewPet}>Create</Button></Row>
							</Modal>
						</Tab>

						{/*Schedule tab*/}
						<Tab title="My Schedule">
							{/*Schedule table*/}
							<Table>
								<thead>
									{/*Colum names*/}
									<tr>
										<th data-field="img">Service</th>
										<th data-field="name">Pet</th>
										<th data-field="date">Date</th>
										<th data-field="details">Details</th>
									</tr>
								</thead>
								<tbody>
									{scheduleTable}
								</tbody>
							</Table>
						</Tab>

						{/*Profile tab*/}
						<Tab title="Profile">
							<Row>
								{/*User image*/}
								<Col l={6} className="valign-wrapper center center-align">
									<MediaBox src={this.props.user.picture} style={responsiveImg} caption="profile_picture"/>
								</Col>
								{/*User information*/}
								<Col l={6}>
									<h5>Name:</h5>
									<p>{this.props.user.name}</p>
									<h5>Adress:</h5>
									<p>{this.props.user.adress}</p>
									<h5>Phone:</h5>
									<p>{this.props.user.phone}</p>
									<h5>Email:</h5>
									<p>{this.props.user.email}</p>
									<h5>Number of pets:</h5>
									<p>{pets.length}</p>
								</Col>
							</Row>
						</Tab>
					</Tabs>
				</div>
			)
		} else { /*if the user isn't logged in*/
			return(
				/*warning message*/
				<Row className="center">
					<Redirect to="/login"/>
					<h4> Please Login </h4>
				</Row>
			)
		}
	}

	deletePet(){
		this.props.db.deletePet(this.petToDelete.id);
		this.props.db.getPets('username', this.props.user.username).then(pet => this.setState({ pets: pet }));
	}

	deleteSchedule(){
		this.props.db.deleteSchedule(this.scheduleToDelete.id);
		this.props.db.getSchedule('username', this.props.user.username).then(schedule => this.setState({ schedules: schedule }));
	}

	createNewPet(){
		let pic, petname, dog, cat, bird, fish;

		petname = document.getElementById("petname").value;

		dog = document.getElementById("radio_dog");
		cat = document.getElementById("radio_cat");
		bird = document.getElementById("radio_bird");
		fish = document.getElementById("radio_fish");

		if (dog.checked){
			pic = require('../img/silhueta_cachorro.png');
		}
		else if (cat.checked){
			pic = require('../img/silhueta_gato.png');
		}
		else if (bird.checked){
			pic = require('../img/silhueta_passaro.png');
		}
		else if (fish.checked){
			pic = require('../img/silhueta_peixe.png');
		}

		if(petname !== ''){
			let newPet = {
				name: petname,
				picture: pic,
				username: this.props.user.username
			}
			this.props.db.putPet(newPet);
			this.setState({createdPet: 'true'});
		}
		this.props.db.getPets('username', this.props.user.username).then(pet => this.setState({ pets: pet }));
	}

	deleteItem(){
		this.props.db.deleteFromCart(this.itemId).then(
			this.props.db.getCart(this.props.user.username).then(item => this.setState({cart: item}))
		)
	}
}