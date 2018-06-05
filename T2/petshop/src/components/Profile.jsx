import React from 'react';

import {Tabs, Tab, Table, Button, MediaBox, Row, Col, Modal, Input} from 'react-materialize';

export default class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pets: [],
		}

		this.petToDelete = null
		this.props.db.getPets('username', this.props.user.username).then(pet => this.setState({ pets: pet }));
		this.deletePet = this.deletePet.bind(this);
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
			console.log(pets);
			// pets = this.props.db.getUserPets(this.props.user.username);
			schedule = (this.props.user.schedule != null ? (this.props.user.schedule) : []);
			cart = (this.props.user.cart) != null ? (this.props.user.cart) : [];
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
						<Row className="right">
							<Col>
							<Modal
							id={"pet"+pet.id}
							header={pet.name}
							trigger={<Button>Details</Button>}>
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
							</Modal>
							</Col>
							<Col>
							<Button id="index" onClick={ ()=> {
								this.petToDelete = pet;
								this.deletePet();
							}}> Delete </Button>
							</Col>
						</Row>
					</td>
				</tr>
			)
		});

		let servicesTable = schedule.map((service) => {
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
						trigger={<Button>Details</Button>}>
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
							<Row className="left"><Button> Delete </Button></Row>
						</Modal>
					</td>
				</tr>
			)
		});

		let cartTable = cart.map((product) => {
			total += parseInt(product.price, 10) * parseInt(product.quantity, 10);

			return (
				<tr>
					{/*Product picture*/}
					<td><MediaBox src={product.picture} caption="Product picture" width="150"/></td>
					{/*Product name*/}
					<td>{product.name}</td>
					{/*Quantity*/}
					<td>{product.quantity}</td>
					{/*Price*/}
					<td>{parseInt(product.price, 10) * parseInt(product.quantity, 10)}</td>

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
									<p>{parseInt(product.price, 10) * parseInt(product.quantity, 10)}</p>
								</Col>
							</Row>
							{/*Delete option*/}
							<Row className="left">
								<Button> Delete </Button>
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
						{/*Profile tab*/}
						<Tab title="Profile" active>
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
							trigger={<Button>New pet</Button>}>
								<Row>
									{/*Upload pet's picture*/}
									<Input s={6} m={6} l={6} type="text" label="Pet Name" validate />
								</Row>
								<Row>
								    <Input name='group1' type='radio' value='dog' label='Dog' />
								    <Input name='group1' type='radio' value='cat' label='Cat' />
								    <Input name='group1' type='radio' value='bird' label='Bird' />
								    <Input name='group1' type='radio' value='fish' label='Fish' />
								</Row>
								{/*Create button*/}
								<Row className="left"><Button>Create</Button></Row>
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
									{servicesTable}
								</tbody>
							</Table>
						</Tab>
						{/*Cart tab*/}
						<Tab title="Cart">
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
							trigger={<Button>Checkout</Button>}>
								<h5>Number of items:</h5>
								<p>{cart.length}</p>
								<h5>Total:</h5>
								<p>${total}</p>
								<Button>Pay</Button>
							</Modal>
						</Tab>

					</Tabs>
				</div>
			)
		} else { /*if the user isn't logged in*/
			return(
				/*warning message*/
				<Row className="center">
					<h4> Please Login </h4>
				</Row>
			)
		}
	}

	deletePet(){
		this.props.db.deletePet(this.petToDelete.id);
		this.props.db.getPets('username', this.props.user.username).then(pet => this.setState({ pets: pet }));
	}
}