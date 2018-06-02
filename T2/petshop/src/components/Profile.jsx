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
		// Each row represents a pet and has image, name and a button for more details
		// When the "details" button is pressed, a pop-up window appears with a larger version
		// of the image, the name of the pet and "delete" and "close" options.
		let petsTable = pets.map((pet) => {
			return (
				<tr>
					<td><MediaBox src={pet.picture} caption="Pet picture" width="150"/></td>
					<td>{pet.name}</td>
					<td>
						<Modal
						header={pet.name}
						trigger={<Button>Details</Button>}>
							<Row>
								<Col l={4}>
									<MediaBox src={pet.picture} caption="Pet picture" width="200"/>
								</Col>
								<Col l={4}>
									<h5>Name:</h5>
									<p>{pet.name}</p>
								</Col>
							</Row>
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
					<Row className="center">
						<h4> Welcome {this.props.user.name} !</h4>
					</Row>
					<Tabs className='z-depth-1'>
						<Tab title="Profile" active>
							<Row>
								<Col l={6} className="valign-wrapper center center-align">
									<MediaBox src={this.props.user.picture} style={responsiveImg} caption="profile_picture"/>
								</Col>
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
						<Tab title="Pets">
							<Table>
								<thead>
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
							<Modal
							header='Create new pet'
							trigger={<Button>New pet</Button>}>
								<Row>
									<Row><Input s={6} m={6} l={6} type="text" label="Pet Name" validate /></Row>
									<Row><Button>Upload Picture</Button></Row>
								</Row>
								<Row className="left"><Button>Create</Button></Row>
							</Modal>
						</Tab>
						<Tab title="My Schedule">Products</Tab>
						<Tab title="Cart">Products</Tab>
					</Tabs>
				</div>
			)
		} else {
			return(
				<Row className="center">
					<h4> Please Login </h4>
				</Row>
			)
		}
	}
}