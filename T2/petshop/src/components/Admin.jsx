import React from 'react';
import {Tabs, Tab, Table, Button, Modal} from 'react-materialize';
// import Signup from './Signup.jsx';

export default class Admin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			products: [],
			services: [],
		};

		// getting values from the db and assigning them to the users, products and services attributes
		this.props.db.getAllUsers().then(item => this.setState({ users: item }));
		this.props.db.getAllProducts().then(item => this.setState({ products: item }));
		this.props.db.getAllServices().then(item => this.setState({ services: item }));
	}

	render(){
		let users = this.state.users;
		let products = this.state.products;
		let services = this.state.services;

		// for each user in users, runs the function
		let usersTable = users.map((user, index) => {
			return (
				// creates a table with colums: Name, Username and Datails
				<tr key={index}>
					<td>{user.name}</td>
					<td>{user.username}</td>
					<td>
						<Modal
						header={user.name}
						trigger={<Button>Details</Button>}>
							<p> criar component edit e colocar aqui </p>

						</Modal>
					</td>
				</tr>
			)
		});

		// for each product in products, runs the function
		let productsTable = products.map((prod, index) => {
			return (
				// creates a table with colums: Name, Description, Price and Edit
				<tr key={index}>
					<td>{prod.name}</td>
					<td>{prod.description}</td>
					<td>{prod.price}</td>
					<td>
						<Modal
						header={prod.name}
						trigger={<Button>Edit</Button>}>
							<p> criar component edit e colocar aqui </p>
						</Modal>
					</td>
				</tr>
			)
		});

		// for each service in services, runs the function
		let servicesTable = services.map((service, index) => {
			return (
				// creates a table with colums: Name, Description, Price and Edit
				<tr key={index}>
					<td>{service.title}</td>
					<td>{service.description}</td>
					<td>{service.price}</td>
					<td>
						<Modal
						header={service.title}
						trigger={<Button>Edit</Button>}>
							<p> criar component edit e colocar aqui </p>
						</Modal>
					</td>
				</tr>
			)
		});

		// how the screen should be rendered
		return(
			<div>
				{/*Title*/}
				<h4> Management </h4> 

				{/*Navbar*/}
				<Tabs className='z-depth-1'>
					{/*Users tab*/}
					<Tab title="Users" active>
						{/*Users table*/}
						<Table>
							<thead>
								{/*Colum names for the users table*/}
								<tr>
									<th data-field="name">Name</th>
									<th data-field="username">Username</th>
									<th data-field="details">Details</th>
								</tr>
							</thead>

							{/*Content of the table*/}
							<tbody>
								{usersTable}
							</tbody>
						</Table>
{
						// <Modal
						// header='Create new user'
						// trigger={<Button>New User</Button>}>
						// 	<Signup />
						// </Modal>
}
					</Tab>

					{/*Products tab*/}
					<Tab title="Products">
						{/*Products table*/}
						<Table>
							<thead>
								{/*Names of the colums*/}
								<tr>
									<th data-field="name">Name</th>
									<th data-field="description">Description</th>
									<th data-field="price">Price</th>
									<th data-field="details">Edit</th>
								</tr>
							</thead>

							{/*Content of the products table*/}
							<tbody>
								{productsTable}
							</tbody>
						</Table>
						<Modal
						header='Create new product'
						trigger={<Button>New Product</Button>}>
							<p>New product</p>
						</Modal>
					</Tab>

				{/*Services tab*/}
					<Tab title="Services">
						{/*Services table*/}
						<Table>
							<thead>
								{/*Names of the colums*/}
								<tr>
									<th data-field="name">Name</th>
									<th data-field="description">Description</th>
									<th data-field="price">Price</th>
									<th data-field="details">Edit</th>
								</tr>
							</thead>

							{/*Table content*/}
							<tbody>
								{servicesTable}
							</tbody>
						</Table>

						{/*New service button*/}
						<Modal
						header='Create new service'
						trigger={<Button>New Service</Button>}>
							<p>New Service</p>
						</Modal>

					</Tab>

					<Tab title="Sales">Some Sales Resume here!!!!!!</Tab>
				</Tabs>
			</div>
		)
	}
}