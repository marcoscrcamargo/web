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

		let usersTable = users.map((user) => {
			return (
				<tr>
					<td>{user.name}</td>
					<td>{user.username}</td>
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
										<th data-field="details">Details</th>
									</tr>
								</thead>

								<tbody>
									{usersTable}
								</tbody>
								<Button>New user</Button>
							</Table>
					</Tab>
					<Tab title="Products">Products</Tab>
					<Tab title="Services">Services</Tab>
					<Tab title="Sales">Sales</Tab>
				</Tabs>
			</div>
		)
	}
}