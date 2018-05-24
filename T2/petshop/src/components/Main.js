import React from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from 'react-router-dom';

import Header from './Header.js'
import Footer from './Footer.js'
import Home from './Home.js';
import Products from './Products.js';
import Services from './Services.js';

import './../css/style.css';

export default class Main extends React.Component {
	componentWillMount() {
		document.title = 'Petshop'
	}

	render() {
		return (
		<HashRouter>
		<div>
			<Header />
		  		<ul className="navbar">
					<li className="navbar-item"><NavLink className="navbar-link" exact to="/">Home</NavLink></li>
					<li className="navbar-item"><NavLink className="navbar-link" to="/products">Products</NavLink></li>
					<li className="navbar-item"><NavLink className="navbar-link" to="/services">Services</NavLink></li>
				</ul>

			<div className="content">
				<Route exact path="/" component={Home} />
				<Route path="/products" component={Products} />
				<Route path="/services" component={Services} />
			</div>
			<Footer />
		</div>
		</HashRouter>
		);
	}
}