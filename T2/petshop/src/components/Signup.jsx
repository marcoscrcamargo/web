import React from 'react';
import {Row, Col, Input, Button} from 'react-materialize';

export default class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: null,
			phone: null,
			username: null,
			email: null,
			password: null,
			adress: null,
			created: false
		}

		this.handleNameChange = this.handleNameChange.bind(this)
		this.handlePhoneChange = this.handlePhoneChange.bind(this)
		this.handleUsernameChange = this.handleUsernameChange.bind(this)
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.handleAdressChange = this.handleAdressChange.bind(this)
		this.newUser = this.newUser.bind(this)

	}

	render(){
		let styleCol = {
			'marginTop': '20px',
		}

		// If a new user is created, shows a "User created !" message
		if (this.state.created === 'true') {
			return (
				<Col s={8} m={8} l={8} className="center" style={styleCol}>
					<h4>User Created !</h4>
				</Col>
			)
		}
		else{ // shows input boxes for name, phone number, username, email, password and address otherwise
			// also shows an "Upload a photo" and a "Signup" button
			return(
				<Col s={8} m={8} l={8} className="center" style={styleCol}>
					<h4>Signup !</h4>
					<Row><Col s ={8} m={8} l={8} offset="s4 m4 l4"><Input s={6} m={6} l={6} type="text" label="Full Name" validate onChange={this.handleNameChange} /></Col></Row>
					<Row><Col s ={8} m={8} l={8} offset="s4 m4 l4"><Input s={6} m={6} l={6} type="tel" label="Phone Number" validate onChange={this.handlePhoneChange} /></Col></Row>
					<Row><Col s ={8} m={8} l={8} offset="s4 m4 l4"><Input s={6} m={6} l={6} type="text" label="Username" validate onChange={this.handleUsernameChange} /></Col></Row>
					<Row><Col s ={8} m={8} l={8} offset="s4 m4 l4"><Input s={6} m={6} l={6} type="email" label="Email" validate onChange={this.handleEmailChange} /></Col></Row>
					<Row><Col s ={8} m={8} l={8} offset="s4 m4 l4"><Input s={6} m={6} l={6} type="password" label="Password" validate onChange={this.handlePasswordChange} /></Col></Row>
					<Row><Col s ={8} m={8} l={8} offset="s4 m4 l4"><Input s={6} m={6} l={6} type="text" label="Adress" validate onChange={this.handleAdressChange} /></Col></Row>
					<Row><Button waves='light'>Upload a photo</Button></Row>
					<Row><Button waves='light' onClick={this.newUser}>Signup</Button></Row>
				</Col>
			)
		}
	}

	// assigns the input value to the name
	handleNameChange(e) {
		this.setState({name: e.target.value});
	}

	// assigns the input value to the phone
	handlePhoneChange(e) {
		this.setState({phone: e.target.value});
	}

	// assigns the input value to the username
	handleUsernameChange(e) {
		this.setState({username: e.target.value});
	}

	// assigns the input value to the email
	handleEmailChange(e) {
		this.setState({email: e.target.value});
	}

	// assigns the input value to the password
	handlePasswordChange(e) {
		this.setState({password: e.target.value});
	}

	// assigns the input value to the address
	handleAdressChange(e) {
		this.setState({Adress: e.target.value});
	}

	// Inserts the a new user into the indexedDB
	newUser(){
		let new_user = {
			name: this.state.name,
			phone: this.state.phone,
			picture: require('../img/avatar.png'),
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			admin: 'false',
			adress: this.state.adress
		}
		this.props.db.putUser(new_user);
		this.setState({created: 'true'});
	}

}