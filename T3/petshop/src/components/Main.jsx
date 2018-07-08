import React from 'react';
import { Navbar, NavItem, Footer, Container} from 'react-materialize';
import { Route, NavLink, HashRouter} from 'react-router-dom';

import Header from './Header.jsx'
import Home from './Home.jsx';
import Products from './Products.jsx';
import Services from './Services.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import Admin from './Admin.jsx';
import Profile from './Profile.jsx';

export default class Main extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			user: null,
			username: null,
			password: null
		}
		this.userLogin = this.userLogin.bind(this)
		this.handleUsernameChange = this.handleUsernameChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.userLogout = this.userLogout.bind(this)
	}

	render() {

		var user = this.state.user;

		// flag that indicates wheter the user is logged in
		const isLoggedIn = (user !== null) ? true : false;
		// flag that indicates wheter the user is an admin
		const isAdmin = isLoggedIn ? (user.admin === 'true') : false;

		// If the user is an Admin, there will be an Management tab in the navbar
		const management = isAdmin ? (
			<NavLink to="/admin"><NavItem>Management</NavItem></NavLink>
		) : (
			null
		);

		// If the user is logged in, there will be an Profile tab in the navbar
		const loginProfile = isLoggedIn ? (
			<NavLink to="/profile"><NavItem>Profile</NavItem></NavLink>
		) : (
			<NavItem><NavLink className="hide-on-large-only" to="/login">Login</NavLink></NavItem>
		);

		// returns what the page should render
		return (
			<HashRouter>
				<div className="cyan"> {/*this div contains all the main page*/}
					<Header
						// setting the attributes and functions of the header
						user={user}
						onClickLogin={this.userLogin}
						onClickLogout={this.userLogout}
						handleUsernameChange={this.handleUsernameChange}
						handlePasswordChange={this.handlePasswordChange}
					/>
					<div className="wrap">
						{/*setting the navbar*/}
						<Navbar className="cyan darken-1" brand='Petshop' left
							options={{closeOnClick: true, draggable: true}}
						>
							{/*Itens of the navbar*/}
							<NavLink exact to="/"><NavItem>Home</NavItem></NavLink>
							<NavLink to="/products"><NavItem>Products</NavItem></NavLink>
							<NavLink to="/services"><NavItem>Services</NavItem></NavLink>
							{/*These two attributes depends on the user, if he/she is logged in or not*/}
							{loginProfile}
							{management}
						</Navbar>

						{/*This container contains all the main content of the page*/}
						<div className="content white">
							<Container> 
								<Route exact path="/" component={Home} />
								<Route path="/products" render={ ()=> <Products db={this.props.db} user={user}/> } />
								<Route path="/admin" render={ ()=><Admin db={this.props.db} user={user}/>} />
								<Route path="/services" render={ ()=> <Services db={this.props.db} user={user} />} />
								<Route path="/login" render={ ()=> <Login
										user={user}
										onClickLogin={this.userLogin}
										onClickLogout={this.userLogout}
										handleUsernameChange={this.handleUsernameChange}
										handlePasswordChange={this.handlePasswordChange}
									/> } />
								<Route path="/signup" render={ ()=> <Signup db={this.props.db} /> } />
								<Route path="/forgot_password" component={ForgotPassword} />
								<Route path="/profile" render={ ()=> <Profile db={this.props.db} user={user}/> } />
							</Container>
						</div>

						{/*Setting the footer of the page*/}
						<Footer className="grey darken-4" copyrights="2018 Copyright Text"
							moreLinks={
		    					<a className="grey-text text-lighten-4 right" href="https://github.com/marcoscrcamargo/web">Github</a>
		  					}
						>
							<h3>Our Team</h3>
							<p>Gabriel Camargo <a className="grey-text text-lighten-4" href="mailto:gabrielcamargo@usp.br">(gabrielcamargo@usp.br)</a></p>
							<p>Letícia Sakurai <a className="grey-text text-lighten-4" href="mailto:leticia.sakurai@usp.br">(leticia.sakurai@usp.br)</a></p>
							<p>Marcos Camargo <a className="grey-text text-lighten-4" href="mailto:marcoscrcamargo@gmail.com">(marcoscrcamargo@gmail.com)</a></p>
							<p>Victor Forbes <a className="grey-text text-lighten-4" href="mailto:victor.forbes@usp.br">(victor.forbes@usp.br)</a></p>
						</Footer>
					</div>

				</div>
			</HashRouter>
		);
	}


	// Assigning the value received in the input to the username
	handleUsernameChange(e) {
		this.setState({username: e.target.value});
	}

	// Assigning the value received in the input to the password
	handlePasswordChange(e) {
		this.setState({password: e.target.value});
	}

	// Validates the user's login process
	userLogin() {
		if (this.state.username == null){  // if there is no value for the username
			window.Materialize.toast('Usuário Invalido!', 4000);
		} else {
			let users = this.getAllUsers();
			users.then(users => {
				console.log(users);
				let find = false;
				users.forEach( usr =>{
					if(this.state.username === usr.value.username){
						find = true;
						if(usr.value.password === this.state.password){ // if the password matches 
							this.setState({ user: usr.value }); // sets the user attribute
						} else { // if the password doesn't match, prints a warning message
							window.Materialize.toast('Senha incorreta!', 4000);
						}
					}
				});
				if(!find){ // if there is no result, prints a warning message
					this.setState({ user: null });
					window.Materialize.toast('Usuário Invalido!', 4000);
				}
			});
		}
	}

	async getAllUsers(){
		let response = await fetch('http://localhost:4000/user');
		let users = await response.json();
		return users;
	}

	// logs the user out
	userLogout() {
		this.setState({ // cleans the values of user and username
			user: null,
			username: null
		})
	}

}