import React from 'react';
import { Navbar, NavItem, Footer } from 'react-materialize';
import {
  Route,
  NavLink,
  HashRouter
} from 'react-router-dom';

import Header from './Header.js'
import Home from './Home.js';
import Products from './Products.js';
import Services from './Services.js';


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
				<Navbar className="red lighten-2" brand='logo' left
					options={{closeOnClick: true, draggable: true}}
				>
					<NavItem><NavLink className="red lighten-2" exact to="/">Home</NavLink></NavItem>
					<NavItem><NavLink className="red lighten-2" to="/products">Products</NavLink></NavItem>
					<NavItem><NavLink className="red lighten-2" to="/services">Services</NavLink></NavItem>
					<NavItem><NavLink className="red lighten-2 hide-on-large-only" to="/services">Login</NavLink></NavItem>
				</Navbar>

				<div className="content">
					<Route exact path="/" component={Home} />
					<Route path="/products" component={Products} />
					<Route path="/services" component={Services} />
				</div>

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