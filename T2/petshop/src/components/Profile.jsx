import React from 'react';

import {Tabs, Tab, Table, Button, MediaBox, Row, Col, Modal, Input} from 'react-materialize';

export default class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		}

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

		// If the user is logged in, gets all his/her pets
		if (isLoggedIn) {
			pets = (this.props.user.pets) != null ? (this.props.user.pets) : [];
		}

		// Sets a list of pets as a table
		// Each row represent a pet and has image, name and a button for more details
		// When the "details" button is pressed, a pop-up window appears with a larger version
		// of the image, the name of the pet and "delete" and "close" options.
		let petsTable = pets.map((pet) => {
			return (
				<tr>
					{/*Pet picture*/}
					<td><MediaBox src={pet.picture} caption="Pet picture" width="150"/></td>
					{/*Pet name*/}
					<td>{pet.name}</td>
					{/*Details option*/}
					<td>
						<Modal
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
							<Row className="left"><Button> Delete </Button></Row>
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
										<th data-field="img">Pet</th>
										<th data-field="name">Name</th>
										<th data-field="details">Details</th>
									</tr>
								</thead>
								<tbody>
									{petsTable}
								</tbody>
							</Table>
							{/*Add new pet option*/}
							<Modal
							header='Create new pet'
							trigger={<Button>New pet</Button>}>
								<Row>
									{/*Upload pet's picture*/}
									<Row><Input s={6} m={6} l={6} type="text" label="Pet Name" validate /></Row>
									<Row><Button>Upload Picture</Button></Row>
								</Row>
								{/*Create button*/}
								<Row className="left"><Button>Create</Button></Row>
							</Modal>
						</Tab>
						{/*Products tab*/}
						<Tab title="My Schedule">Products</Tab>
						{/*Cart*/}
						<Tab title="Cart">Products</Tab>
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
}