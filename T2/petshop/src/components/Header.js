import React from 'react';
import {Row, Col, Input, Button} from 'react-materialize';
import {NavLink} from 'react-router-dom';

export default class Header extends React.Component {
	render() {
		let styleImg = {
			'max-width': '100px',
		}

		let styleLoginRow = {
			'margin': '0px'
		}
		let styleLoginRowM = {
			'margin-left': '10px'
		}

		let styleLoginLink = {
			'font-size': 'x-small'
		}

		let styleLogo = {
			'font-size': 'x-large',
			'padding': '10px',
		}

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
			<Col s={5} m={8} l={5} className="right styleLoginRow valign-wrapper">
				<Col s={8} m={8} l={4} className="left-align">
					<Row className="left-align" style={styleLoginRow}><Input style={styleLoginRow} type="text" label="Username" /></Row>
					<Row className="left-align" style={styleLoginRowM}><a  style={styleLoginLink}>Sign Up</a></Row>
				</Col>
				<Col s={8} m={8} l={4}>
					<Row className="left-align" style={styleLoginRow}><Input style={styleLoginRow} type="password" label="Password" /></Row>
					<Row className="left-align" style={styleLoginRowM}><a  style={styleLoginLink}>Forgot Password?</a></Row>
				</Col>
				<Col s={8} m={8} l={3}>
					<Button waves='light'>Login</Button>
				</Col>
			</Col>

		{/*
				<a className="logo-text" href="#">
				<img src={require('../img/paw.png')} style={styleImg} alt="Logo"/>
				Petshop
				</a>


			<form className="row" action="#" method="get" accept-charset="utf-8">
					<div className="column">
						<input className="header-login" type="text" name="username" placeholder="Username" required />
						<a className="under-login" href="#">Sign Up</a>
					</div>

					<div className="column">
						<input className="header-login" type="password" name="password" placeholder="Password" required />
						<a className="under-login" href="#">Forgot Password?</a>
					</div>

					<button className="login-button" type="submit">Login</button>
				</form>


		*/}
		</Row>


		);
	}
}