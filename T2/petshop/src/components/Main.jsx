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
	// componentWillMount() {
	// 	document.title = 'Petshop'
	// }

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
		// var user = this.state.user;
		var user = 	{
			name: 'Marcos Camargo',
			phone: '14997189943',
			picture: require('../img/avatar.png'),
			cart: [
				{
					name: 'Ração X',
					price: '55,00',
					quantity: '3',
					picture: require('../img/prod.jpg'),
					description: 'Ração pra animal doente1'
				},
				{
					name: 'Ração X',
					price: '55,00',
					quantity: '4',
					picture: require('../img/prod.jpg'),
					description: 'Ração pra animal doente1'
				},
				{
					name: 'Ração X',
					price: '55,00',
					quantity: '5',
					picture: require('../img/prod.jpg'),
					description: 'Ração pra animal doente1'
				},
			],

			sales : [
				{
					name: 'Ração X',
					price: '55,00',
					quantity: '5',
					date: "October 15, 2018 13:10:00",
					picture: require('../img/prod.jpg')
				},
				{
					name: 'Ração X',
					price: '55,00',
					quantity: '6',
					date: "October 16, 2018 13:20:00",
					picture: require('../img/prod.jpg')
				},
				{
					name: 'Ração X',
					price: '55,00',
					quantity: '7',
					picture: require('../img/prod.jpg'),
					date: "October 17, 2018 13:30:00"
				},
			],
			username: 'marcoscrcamargo',
			email: 'marcoscrcamargo@gmail.com',
			password: 'admin',
			admin: 'true',
			adress: 'R. Carlos de Camargo Salles, 306 Apt. 2'
		};

		// flag that indicates wheter the user is logged in
		const isLoggedIn = (user !== null);
		// flag that indicates wheter the user is an admin
		const isAdmin = isLoggedIn ? (user.admin === 'true') : false;

		// If the user is an Admin, there will be an Management tab in the navbar
		const management = isAdmin ? (
			<NavItem className="red lighten-2"><NavLink to="/admin">Management</NavLink></NavItem>
		) : (
			null
		);

		// If the user is logged in, there will be an Profile tab in the navbar
		const loginProfile = isLoggedIn ? (
			<NavItem className="red lighten-2"><NavLink to="/profile">Profile</NavLink></NavItem>
		) : (
			<NavItem className="red lighten-2"><NavLink className="hide-on-large-only" to="/login">Login</NavLink></NavItem>
		);

		// returns what the page should render
		return (
			<HashRouter>
				<div> {/*this div contains all the main page*/}
					<Header
						// setting the attributes and functions of the header
						user={user}
						onClickLogin={this.userLogin}
						onClickLogout={this.userLogout}
						handleUsernameChange={this.handleUsernameChange}
						handlePasswordChange={this.handlePasswordChange}
					/>
					{/*setting the navbar*/}
					<Navbar className="red lighten-2" brand='Petshop' left
						options={{closeOnClick: true, draggable: true}}
					>
						{/*Itens of the navbar*/}
						<NavItem className="red lighten-2"><NavLink exact to="/">Home</NavLink></NavItem>
						<NavItem className="red lighten-2"><NavLink to="/products">Products</NavLink></NavItem>
						<NavItem className="red lighten-2"><NavLink to="/services">Services</NavLink></NavItem>
						{/*These two attributes depends on the user, if he/she is logged in or not*/}
						{loginProfile}
						{management}
					</Navbar>

					{/*This container contains all the main content of the page*/}
					<Container>
						<Route exact path="/" component={Home} />
						<Route path="/products" render={ ()=> <Products db={this.props.db} /> } />
						<Route path="/admin" render={ ()=><Admin db={this.props.db} user={user}/>} />
						<Route path="/services" render={ ()=> <Services db={this.props.db} user={user} />} />
						<Route path="/login" render={ ()=> <Login onClickLogin={this.userLogin}/> } />
						<Route path="/signup" render={ ()=> <Signup db={this.props.db} /> } />
						<Route path="/forgot_password" component={ForgotPassword} />
						<Route path="/profile" render={ ()=> <Profile db={this.props.db} user={user}/> } />
					</Container>

					{/*Setting the footer of the page*/}
					<Footer copyrights="2018 Copyright Text"
						moreLinks={
	    					<a className="grey-text text-lighten-4 right" href="https://github.com/marcoscrcamargo/web">Github</a>
	  					}
					>
						<h3>Our Team</h3>
						<p>Gabriel Camargo <a className="grey-text text-lighten-4" href="mailto:gabrielcamargo@usp.br">(gabrielcamargo@usp.br)</a></p>
						<p>Marcos Camargo <a className="grey-text text-lighten-4" href="mailto:marcoscrcamargo@gmail.com">(marcoscrcamargo@gmail.com)</a></p>
						<p>Victor Forbes <a className="grey-text text-lighten-4" href="mailto:victor.forbes@usp.br">(victor.forbes@usp.br)</a></p>
					</Footer>

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
			this.props.db.getUser('username', this.state.username) // tries to get the username from the db
				.then(usr => {
					if (usr == null) { // if there is no result, prints a warning message
						this.setState({ user: null });
						window.Materialize.toast('Usuário Invalido!', 4000);
					} else { // if there if a result
						if(usr.password === this.state.password){ // if the password matches 
							this.setState({ user: usr }); // sets the user attribute
						} else { // if the password doesn't match, prints a warning message
							window.Materialize.toast('Senha incorreta!', 4000);
						}
					}
				});
		}
	}

	// logs the user out
	userLogout() {
		this.setState({ // cleans the values of user and username
			user: null,
			username: null
		})
	}

}