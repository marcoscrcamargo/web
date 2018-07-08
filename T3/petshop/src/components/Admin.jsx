import React from 'react';
import { Tabs, Tab, Table, Button, Modal, MediaBox} from 'react-materialize';

import ProductsManagement from './ProductsManagement.jsx';
import ServicesManagement from './ServicesManagement.jsx';

export default class Admin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			products: [],
			services: [],
			sales: [],
		};

		// getting values from the db and assigning them to the users, products and services attributes
		this.props.db.getAllUsers().then(item => this.setState({ users: item }));
		this.props.db.getAllServices().then(item => this.setState({ services: item }));
		this.props.db.getAllSales().then(item => this.setState({ sales: item }));
	}

	render(){
		let users = this.state.users;
		let sales = this.state.sales;

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
							<p>  </p>

						</Modal>
					</td>
				</tr>
			)
		});

		// for each sale in sales, runs the function
		let salesTable = sales.map((sale, index) => {
			return (
				// creates a table with colums: Product, Quantity, Total Price and Date
				<tr key={index}>
					<td><MediaBox src={sale.picture} caption="Sale picture" width="150"/></td>
					<td>{sale.username}</td>
					<td>{sale.quantity}</td>
					<td>{parseInt(sale.price, 10) * parseInt(sale.quantity, 10)}</td>
					<td>{sale.date}</td>					
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
					<Tab title="Users">
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
						<ProductsManagement/>
					</Tab>

				{/*Services tab*/}
					<Tab title="Services">
						<ServicesManagement/>
					</Tab>

					<Tab title="Sales">
						{/*Sales table*/}
						<Table>
							<thead>
								{/*Names of the colums*/}
								<tr>
									<th data-field="product">Product</th>
									<th data-field="username">Username</th>
									<th data-field="quantity">Quantity</th>
									<th data-field="price">Total Price</th>
									<th data-field="date">Date</th>
								</tr>
							</thead>

							{/*Table content*/}
							<tbody>
								{salesTable}
							</tbody>
						</Table>

					</Tab>
				</Tabs>
			</div>
		)
	}
}