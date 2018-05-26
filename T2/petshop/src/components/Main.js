import React from 'react';
import { Navbar, NavItem, Footer, Container, Row} from 'react-materialize';
import { Route, NavLink, HashRouter} from 'react-router-dom';

import Header from './Header.js'
import Home from './Home.js';
import Products from './Products.js';
import Services from './Services.js';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import Admin from './Admin.jsx';


export default class Main extends React.Component {
	componentWillMount() {
		document.title = 'Petshop'
	}

	render() {
		return (
		<HashRouter>
			<div>
				{/*<Header />*/}
				<Header/>
				<Navbar className="red lighten-2" brand='Petshop' left
					options={{closeOnClick: true, draggable: true}}
				>
					<NavItem className="red lighten-2"><NavLink exact to="/">Home</NavLink></NavItem>
					<NavItem className="red lighten-2"><NavLink to="/products">Products</NavLink></NavItem>
					<NavItem className="red lighten-2"><NavLink to="/services">Services</NavLink></NavItem>
					<NavItem className="red lighten-2"><NavLink className="hide-on-large-only" to="/login">Login</NavLink></NavItem>
				</Navbar>

				<Container>
					<Route exact path="/" component={Home} />
					<Route path="/products" component={Products} />
					<Route path="/services" component={Services} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/forgot_password" component={ForgotPassword} />
					<Route path="/admin" component={Admin} />
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
}