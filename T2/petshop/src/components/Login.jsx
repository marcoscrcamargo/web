import React from 'react';
import {Row, Col, Input, Button} from 'react-materialize';
import {NavLink} from 'react-router-dom';
import { Redirect } from 'react-router';
export default class Login extends React.Component{
	render() {
		let styleLoginRow = {
			'font-size': 'small',
			'text-align': 'left'
		}
		let styleLoginLink = {
			'margin-left': '10px',
			}
		const isLoggedIn = (this.props.user !== null);

		const profileLogin = isLoggedIn ? (
			<Redirect to="/profile"/>
		) : (
			<Col s={8} m={8} l={8} className="center">
				<Row><Col s ={8} m={8} l={8} offset="s4 m4 l4"><Input s={6} m={6} l={6} type="text" label="Username" onChange={this.props.handleUsernameChange}/></Col></Row>
				<Row style={styleLoginRow}><Col s ={8} m={8} l={8} offset="s4 m4 l4"><NavLink className="cyan-text text-darken-4" to="/signup" style={styleLoginLink}>Sign Up</NavLink></Col></Row>
				<Row><Col s ={8} m={8} l={8} offset="s4 m4 l4"><Input s={6} m={6} l={6} type="password" label="Password" onChange={this.props.handlePasswordChange} /></Col></Row>
				<Row style={styleLoginRow}><Col s ={8} m={8} l={8} offset="s4 m4 l4"><NavLink  className="cyan-text text-darken-4" to="/forgot_password" style={styleLoginLink}>Forgot Password?</NavLink></Col></Row>
				<Row><Button onClick={this.props.onClickLogin}>Login</Button></Row>
			</Col>
		);

		// Builds two input boxes, buttons to log in or sign up and a "forgot password?" option
		return(
			<div>
				{profileLogin}
			</div>
		);
	}
}