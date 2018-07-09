import React from 'react';
import { Tabs, Tab, Table, Button, Modal, MediaBox, Row, Col, Input} from 'react-materialize';

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

		this.userToEdit = null;
		this.handleIsAdmin = this.handleIsAdmin.bind(this);

		// getting values from the db and assigning them to the users, products and services attributes
		this.getAllUsers().then(item => this.setState({ users: item }));
		this.getAllSales().then(item => this.setState({ sales: item }));
	}

	render(){
		let users = this.state.users;
		let sales = this.state.sales;


		// for each user in users, runs the function
		let usersTable = users.map((user, index) => {
			let isAdminInput = user.value.admin === 'true' ? <Input name='isadmin' type='checkbox' value='admin' label='Admin' checked onChange={(e) =>{this.userToEdit = user; this.handleIsAdmin(e);}}/> : 									<Input name='isadmin' type='checkbox' value='admin' label='Admin' onChange={(e) =>{this.userToEdit = user; this.handleIsAdmin(e);}}/>;
			return (
				// creates a table with colums: Name, Username and Details
				<tr key={index}>
					<td>{user.value.name}</td>
					<td>{user.value.username}</td>
					<td>
						<Modal
						header={user.value.name}
						trigger={<Button>Details</Button>}>
							{/*Pop-up window with more details*/}
							<Row>
								{/*Larger pet picture*/}
								<Col l={4}>
									<MediaBox src={user.value.picture} caption="User picture" width="200"/>
								</Col>
								{/*user info*/}
								<Col l={4}>
									<h5>Name:</h5>
									<p>{user.value.name}</p>
									<h5>Phone:</h5>
									<p>{user.value.phone}</p>
									<h5>Username:</h5>
									<p>{user.value.username}</p>
									<h5>Email:</h5>
									<p>{user.value.email}</p>
									<h5>Address:</h5>
									<p>{user.value.adress}</p>
									<h5>Admin:</h5>
									{isAdminInput}
								</Col>
							</Row>
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

	async handleIsAdmin(e){
		let user = this.userToEdit;
		console.log(user);
		let eventvalue = e.target.checked;
		let response = await fetch('http://localhost:4000/user/' + user.id);
		let reference = await response.json();

		user.value._rev = reference._rev;
		user.value.admin = eventvalue.toString();
		var url = 'http://127.0.0.1:4000/user/';
		fetch(url, {
			headers: {
				'Content-type':'application/json'
			},
			method:'PUT',
			body: JSON.stringify(user)
		}).then(() => {
			console.log(user)
			if (user.value.admin === "true"){
				window.Materialize.toast(user.value.name + "is admin!", 2000);
			} else {
				window.Materialize.toast(user.value.name + "isn't admin!", 2000);
			}
		}).catch(()=>{console.log('se fude rapaz')});

	}
	async getAllUsers(){
		let response = await fetch('http://localhost:4000/user');
		let users = await response.json();
		return users;
	}

	async getAllSales(){
		let response = await fetch('http://localhost:4000/sale');
		let sales = await response.json();
		return sales;
	}
}