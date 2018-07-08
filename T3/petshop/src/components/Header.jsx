import React from 'react';
import {Row, Col, Input, Button} from 'react-materialize';
import {NavLink} from 'react-router-dom';

export default class Header extends React.Component {
	render() {

		let styleHeader = {
			'paddingBottom': '0px',
		}

		let styleImg = {
			'maxWidth': '100px',
		}

		let styleLoginRow = {
			'margin': '0px',
		}
		let styleLoginRowM = {
			'marginLeft': '10px'
		}

		let styleLoginLink = {
			'fontSize': 'x-small',
		}

		let styleLogo = {
			'fontSize': 'x-large',
			'padding': '10px',
		}

		const isLoggedIn = (this.props.user !== null);

		console.log(isLoggedIn);

		// If the user is logged in, shows his/her basic information and the option to log out
		// If not, then shows the options to log in or sign up
		// This decision is made with a ternary operator
		const profileLogin = isLoggedIn ? (
			<Col s={5} m={8} l={5}>
				<Row className="right">
					<Col>
					{/*Profile picture that links to the user's information page*/}
					<NavLink to="/profile">
						<img src={this.props.user.picture} width="100" alt="profile_picture"/>
					</NavLink>
					</Col>
					<Col>
						{/*Link to the user's info page*/}
						<NavLink to="/profile">
							<p className="cyan-text text-darken-4">{this.props.user.name}</p>
						</NavLink>
						{/*Logout button*/}
						<Button onClick={this.props.onClickLogout}>Logout</Button>
					</Col>
				</Row>
			</Col>
		) : (
			<Col s={5} m={8} l={5} className="right styleLoginRow valign-wrapper cyan-text text-darken-4">
				<Col s={8} m={8} l={4} className="left-align">
					{/*Input box for the username*/}
					<Row className="left-align" style={styleLoginRow}>
						<Input style={styleLoginRow} type="text" label="Username" onChange={this.props.handleUsernameChange}/>
					</Row>
					{/*Link to sign up*/}
					<Row className="left-align" style={styleLoginRowM}>
						<NavLink to="/signup" className="cyan-text text-darken-4" style={styleLoginLink}>Sign Up</NavLink>
					</Row>
				</Col>
				<Col s={8} m={8} l={4}>
					{/*Input box for the password*/}
					<Row className="left-align" style={styleLoginRow}><Input style={styleLoginRow} type="password" label="Password" onChange={this.props.handlePasswordChange}/></Row>
					{/*Link to recover password*/}
					<Row className="left-align" style={styleLoginRowM}>
						<NavLink to="/forgot_password" className="cyan-text text-darken-4" style={styleLoginLink}>Forgot Password?</NavLink>
					</Row>
				</Col>
				<Col s={8} m={8} l={3}>
					{/*Login button*/}
					<Button onClick={this.props.onClickLogin}>Login</Button>
				</Col>
			</Col>
		);

		// returns how the header should be displayed, with the website's logo and the profileLogin part
		return (

		<Row className="valign-wrapper hide-on-med-and-down cyan" style={styleHeader}>
			<Col s={7} m={4} l={7} className="left">
				<NavLink exact to="/">
					<Row className="valign-wrapper">
						{/*Logo and Petshop name*/}
						<img className="responsive-img" src={require('../img/paw.svg')} style={styleImg} alt="Logo"/>
						<span style={styleLogo} className="cyan-text text-darken-4" >Petshop</span>
					</Row>
				</NavLink>
			</Col>
			{/*The rest of the page depends on the user, if he/she is logged in and was defined before*/}
			{profileLogin}
		</Row>


		);
	}
}