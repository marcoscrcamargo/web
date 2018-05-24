import React from 'react';

export default class Header extends React.Component {
	render() {
		return (
		<div className="row header justify">
			<div className="row">
				<a className="logo-text" href="#">
				<img src={require('../img/paw.png')} className="logo-image" alt="Logo"/>
				Petshop
				</a>
			</div>

			<div className="row">
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
			</div>
		</div>



		);
	}
}