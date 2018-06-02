import React from 'react';
import {Row, Col, Input, Button} from 'react-materialize';
import {NavLink} from 'react-router-dom';

export default class Login extends React.Component{
	render() {
		let styleLoginRow = {
			'font-size': 'small',
			'text-align': 'left'

		}
		let styleLoginLink = {
			'margin-left': '10px',
		}

		// Builds two input boxes, buttons to log in or sign up and a "forgot password?" option
		return(
			<Col s={8} m={8} l={8} className="center">
				<Row><Col s ={8} m={8} l={8} offset="s4 m4 l4"><Input s={6} m={6} l={6} type="text" label="Username" /></Col></Row>
				<Row style={styleLoginRow}><Col s ={8} m={8} l={8} offset="s4 m4 l4"><NavLink to="/signup" style={styleLoginLink}>Sign Up</NavLink></Col></Row>
				<Row><Col s ={8} m={8} l={8} offset="s4 m4 l4"><Input s={6} m={6} l={6} type="password" label="Password" /></Col></Row>
				<Row style={styleLoginRow}><Col s ={8} m={8} l={8} offset="s4 m4 l4"><NavLink to="/forgot_password" style={styleLoginLink}>Forgot Password?</NavLink></Col></Row>
				<Row><NavLink to="/profile"><Button waves='light' onClick={this.props.onClickLogin}>Login</Button></NavLink></Row>
			</Col>
		);
	}
}