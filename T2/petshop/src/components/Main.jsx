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
			user: null
		}
		this.userLogin = this.userLogin.bind(this)
		this.userLogout = this.userLogout.bind(this)

	}

	render() {
		var user = this.state.user;

		const isLoggedIn = (user !== null);
		const isAdmin = isLoggedIn ? (user.admin === 'true') : false;

		const management = isAdmin ? (
			<NavItem className="red lighten-2"><NavLink to="/admin">Management</NavLink></NavItem>
		) : (
			null
		);

		const loginProfile = isLoggedIn ? (
			<NavItem className="red lighten-2"><NavLink to="/profile">Profile</NavLink></NavItem>
		) : (
			<NavItem className="red lighten-2"><NavLink className="hide-on-large-only" to="/login">Login</NavLink></NavItem>
		);

		return (
			<HashRouter>
				<div>
					<Header user={user} onClickLogin={this.userLogin} onClickLogout={this.userLogout}/>
					<Navbar className="red lighten-2" brand='Petshop' left
						options={{closeOnClick: true, draggable: true}}
					>
						<NavItem className="red lighten-2"><NavLink exact to="/">Home</NavLink></NavItem>
						<NavItem className="red lighten-2"><NavLink to="/products">Products</NavLink></NavItem>
						<NavItem className="red lighten-2"><NavLink to="/services">Services</NavLink></NavItem>
						{loginProfile}
						{management}
					</Navbar>

					<Container>
						<Route exact path="/" component={Home} />
						<Route path="/products" render={ ()=> <Products db={this.props.db} /> } />
						<Route path="/admin" render={ ()=><Admin db={this.props.db} />} />
						<Route path="/services" render={ ()=> <Services db={this.props.db} />} />
						<Route path="/login" render={ ()=> <Login onClickLogin={this.userLogin}/> } />
						<Route path="/signup" component={Signup} />
						<Route path="/forgot_password" component={ForgotPassword} />
						<Route path="/profile" component={Profile} />
					</Container>

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

	userLogin() {
		this.setState({
			user: {
					id: '1',
					picture: require('../img/avatar.png'),
					name: 'Marcos Camargo',
					phone: '14997189943',
					username: 'marcoscrcamargo',
					email: 'marcoscrcamargo@gmail.com',
					password: 'admin',
					admin: 'true',
					adress: 'R. Carlos de Camargo Salles, 306 Apt. 2'
				}
		})
	}
	userLogout() {
		this.setState({
			user: null
		})
	}

}