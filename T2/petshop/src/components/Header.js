import React from 'react';
import {Row, Col, Input, Button} from 'react-materialize';
import {Route, NavLink, HashRouter} from 'react-router-dom';

export default class Header extends React.Component {
	render() {
		let styleImg = {
			width: '10%',
			height: '20%'
		}

		let styleLoginRow = {
			'margin-bottom': '0px'
		}
		let styleLoginRowM = {
			'margin-left': '10px'
		}

		let styleLoginLink = {
			'font-size': 'x-small'
		}

		return (

		<Row className="valign-wrapper">
			<Col s={4}>
			<NavLink className="navbar-link" exact to="/">
				<img className="responsive-img" src={require('../img/paw.png')} style={styleImg} alt="Logo"/>
				Petshop
			</NavLink>
			</Col>
			<Col s={4}>
			</Col>
			<Col s={4} >
				<Row className="center-align valign-wrapper">
					<Col className="left-align">
						<Row className="left-align" style={styleLoginRow}><Input style={styleLoginRow} type="text" label="Username" /></Row>
						<Row className="left-align" style={styleLoginRowM}><a  style={styleLoginLink}>Sign Up</a></Row>
					</Col>
					<Col >
						<Row className="left-align" style={styleLoginRow}><Input style={styleLoginRow} type="password" label="Password" /></Row>
						<Row className="left-align" style={styleLoginRowM}><a  style={styleLoginLink}>Forgot Password?</a></Row>
					</Col>
					<Button waves='light'>Login</Button>
				</Row>
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