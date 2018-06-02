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

		this.props.db.getAllUsers().then(item => this.setState({ users: item }));
		this.props.db.getAllProducts().then(item => this.setState({ products: item }));
		this.props.db.getAllServices().then(item => this.setState({ services: item }));
	}


	render(){
		let users = this.state.users;
		let products = this.state.products;
		let services = this.state.services;

		let usersTable = users.map((user, index) => {
			return (
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

		let productsTable = products.map((prod, index) => {
			return (
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
		let servicesTable = services.map((service, index) => {
			return (
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

		return(
			<div>
				<h4> Management </h4>
				<Tabs className='z-depth-1'>
					<Tab title="Users" active>
						<Table>
							<thead>
								<tr>
									<th data-field="name">Name</th>
									<th data-field="username">Username</th>
									<th data-field="details">Details</th>
								</tr>
							</thead>

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
					<Tab title="Products">
						<Table>
							<thead>
								<tr>
									<th data-field="name">Name</th>
									<th data-field="description">Description</th>
									<th data-field="price">Price</th>
									<th data-field="details">Edit</th>
								</tr>
							</thead>
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
					<Tab title="Services">
						<Table>
							<thead>
								<tr>
									<th data-field="name">Name</th>
									<th data-field="description">Description</th>
									<th data-field="price">Price</th>
									<th data-field="details">Edit</th>
								</tr>
							</thead>
							<tbody>
								{servicesTable}
							</tbody>
						</Table>
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