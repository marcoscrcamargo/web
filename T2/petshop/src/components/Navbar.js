import React from 'react';

class NavbarItem extends React.Component {
	onClick() {

	}
	render() {
		return(
			<li className="navbar-item {this.props.active}">
			<a class="navbar-link" onClick={this.props.onClick()}>
			{this.props.text}
			</a></li>
		);
	}
}

export default class Navbar extends React.Component {
	renderItem(active, text) {
		return <NavbarItem active={active} text={text}/>
	}
	render() {
		return (
			<div>
			<ul className="navbar">
				{this.renderItem('', 'Home')}
				{this.renderItem('', 'Products')}
				{this.renderItem('', 'Services')}
			</ul>

			</div>
		);
	}
}