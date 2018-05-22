import React from 'react';

export default class Header extends React.Component {
	render() {
		return (
		<div class="row header justify">
			<div class="row">
				<a class="logo-text" href="#">
				<img src="../images/paw.png" class="logo-image" alt="Logo"/>
				Petshop
				</a>
			</div>

			<div class="row">
				<form class="row" action="#" method="get" accept-charset="utf-8">
					<div class="column">
						<input class="header-login" type="text" name="username" placeholder="Username" required />
						<a class="under-login" href="#">Sign Up</a>
					</div>

					<div class="column">
						<input class="header-login" type="password" name="password" placeholder="Password" required />
						<a class="under-login" href="#">Forgot Password?</a>
					</div>

					<button class="login-button" type="submit">Login</button>
				</form>
			</div>
		</div>



		);
	}
}