import React from 'react';
import {Row, Col, Input, Button} from 'react-materialize';
import {NavLink} from 'react-router-dom';

export default class Header extends React.Component {
	render() {
		let styleImg = {
			'maxWidth': '100px',
		}

		let styleLoginRow = {
			'margin': '0px'
		}
		let styleLoginRowM = {
			'marginLeft': '10px'
		}

		let styleLoginLink = {
			'fontSize': 'x-small'
		}

		let styleLogo = {
			'fontSize': 'x-large',
			'padding': '10px',
		}

		const isLoggedIn = (this.props.user !== null);

		// If the user is logged in, shows his/her basic information and the option to log out
		// If not, then shows the options to log in or sign up
		// This decision is made with a ternary operator
		const profileLogin = isLoggedIn ? (
			<Col s={5} m={8} l={5}>
				<Row className="right">
					<Col>
					<NavLink to="/profile">
						<img src={this.props.user.picture} width="100" alt="profile_picture"/>
					</NavLink>
					</Col>
					<Col>
						<NavLink to="/profile">
							<p>{this.props.user.name}</p>
						</NavLink>
						<Button waves='light' onClick={this.props.onClickLogout}>Logout</Button>
					</Col>
				</Row>
			</Col>
		) : (
			<Col s={5} m={8} l={5} className="right styleLoginRow valign-wrapper">
				<Col s={8} m={8} l={4} className="left-align">
					<Row className="left-align" style={styleLoginRow}><Input style={styleLoginRow} type="text" label="Username" onChange={this.props.handleUsernameChange}/></Row>
					<Row className="left-align" style={styleLoginRowM}><NavLink to="/signup" style={styleLoginLink}>Sign Up</NavLink></Row>
				</Col>
				<Col s={8} m={8} l={4}>
					<Row className="left-align" style={styleLoginRow}><Input style={styleLoginRow} type="password" label="Password" onChange={this.props.handlePasswordChange}/></Row>
					<Row className="left-align" style={styleLoginRowM}><NavLink to="/forgot_password" style={styleLoginLink}>Forgot Password?</NavLink></Row>
				</Col>
				<Col s={8} m={8} l={3}>
					<Button waves='light' onClick={this.props.onClickLogin}>Login</Button>
				</Col>
			</Col>
		);

		// returns how the header should be displayed, with the website's logo and the profileLogin part
		return (

		<Row className="valign-wrapper hide-on-med-and-down">
			<Col s={7} m={4} l={7} className="left">
				<NavLink exact to="/">
					<Row className="valign-wrapper">
						<img className="responsive-img" src={require('../img/paw.png')} style={styleImg} alt="Logo"/>
						<span style={styleLogo}>Petshop</span>
					</Row>
				</NavLink>
			</Col>
			{profileLogin}
		</Row>


		);
	}
}