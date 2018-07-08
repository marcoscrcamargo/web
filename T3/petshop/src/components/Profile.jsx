import React from 'react';

import {Tabs, Tab, MediaBox, Row, Col } from 'react-materialize';
import { Redirect } from 'react-router';

import Cart from './Cart.jsx';
import Pets from './Pets.jsx';
import Schedule from './Schedule.jsx';

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {pets: []};
		
		if (this.props.user !== null){
			this.getPets(this.props.user.username).then(pet => this.setState({ pets: pet }));
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
						<Tab title="Cart">
							<Cart db={this.props.db} user={this.props.user}/>
						</Tab>

						{/*Pets tab*/}
						<Tab title="Pets">
							<Pets db={this.props.db} user={this.props.user}/>
						</Tab>

						{/*Schedule tab*/}
						<Tab title="My Schedule">
							<Schedule db={this.props.db} user={this.props.user}/>
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
									<p>{this.state.pets.length}</p>
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

	async getPets(username){
		let response = await fetch('http://localhost:4000/pet');
		let pets = await response.json();
		let pet_from_user = pets.filter((pets) => {
			return pets.value.username === username
		});
		return pet_from_user;
	}

}