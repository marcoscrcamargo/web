import React from 'react';
import {Tabs, Tab, Table, Button} from 'react-materialize';

export default class Signup extends React.Component {
	render(){
		let users = [
			{
				id: '1',
				name: 'Marcos Camargo',
				phone: '14997189943',
				username: 'marcoscrcamargo',
				email: 'marcoscrcamargo@gmail.com',
				password: 'admin',
				admin: 'true',
				adress: 'R. Carlos de Camargo Salles, 306 Apt. 2'
			},
			{
				id: '2',
				name: 'Victor Forbes',
				phone: '',
				username: 'victorxjoey',
				email: 'victor.forbes@usp.br',
				password: 'admin',
				admin: 'true',
				adress: 'R. x'
			},
			{
				id: '3',
				name: 'Gabriel Camargo',
				phone: '',
				username: 'gabrielcamargo',
				email: 'gabrielcamargos@usp.br',
				password: 'admin',
				admin: 'true',
				adress: 'R. x'
			},
		];

		let products = [
			{
				img_file: require('../img/prod.jpg'),
				name: 'Ração X',
				description: 'Ração pra animal doente1',
				price: '55.00'
			},
			{
				img_file: require('../img/prod.jpg'),
				name: 'Ração X',
				description: 'Ração pra animal doente2',
				price: '35.00'
			},
			{
				img_file: require('../img/prod.jpg'),
				name: 'Ração X',
				description: 'Ração pra animal doente1',
				price: '55.00'
			},

		];

		let services = [
			{
				title: 'Grooming',
				img_file: require('../img/tosa.jpg'),
				description: "We have the best professionals to take care of your pet's hair!",
				price: '$10.00'
			},
			{
				title: 'Castration',
				img_file: require('../img/castracao.jpg'),
				description: 'We have the best doctors to make the procedure safely!',
				price: '$80.00'
			},
			{
				title: 'Bath',
				img_file: require('../img/banho.jpg'),
				description: 'We leave your pet clean and smelling good for a fair price!',
				price: '15.00'
			},
			{
				title: 'Vaccination',
				img_file: require('../img/vacinacao.jpg'),
				description: 'We apply vaccines to keep your pet always protected and healthy!',
				price: '20.00'
			},

		];



		let usersTable = users.map((user) => {
			return (
				<tr>
					<td>{user.name}</td>
					<td>{user.username}</td>
					<td><Button>Edit</Button></td>
				</tr>
			)
		});

		let productsTable = products.map((prod) => {
			return (
				<tr>
					<td>{prod.name}</td>
					<td>{prod.description}</td>
					<td>{prod.price}</td>
					<td><Button>Edit</Button></td>
				</tr>
			)
		});
		let servicesTable = services.map((service) => {
			return (
				<tr>
					<td>{service.title}</td>
					<td>{service.description}</td>
					<td>{service.price}</td>
					<td><Button>Edit</Button></td>
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
									<th data-field="details">Edit</th>
								</tr>
							</thead>

							<tbody>
								{usersTable}
							</tbody>
							<Button>New user</Button>
						</Table>
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
							<Button>New product</Button>
						</Table>
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
							<Button>New service</Button>
						</Table>

					</Tab>

					<Tab title="Sales">Some Sales Resume here!!!!!!</Tab>
				</Tabs>
			</div>
		)
	}
}