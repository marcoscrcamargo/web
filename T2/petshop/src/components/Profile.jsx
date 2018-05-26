import React from 'react';

import {Tabs, Tab, Table, Button, MediaBox} from 'react-materialize';

export default class Profile extends React.Component {
	render(){
		let user = {
				id: '1',
				name: 'Marcos Camargo',
				phone: '14997189943',
				username: 'marcoscrcamargo',
				email: 'marcoscrcamargo@gmail.com',
				password: 'admin',
				admin: 'true',
				adress: 'R. Carlos de Camargo Salles, 306 Apt. 2'
			};

		let pets = [
			{
				name: 'Marley',
				picture: require('../img/cachorro.jpg')
			},
			{
				name: 'Tom',
				picture: require('../img/gato.jpg')
			},
			{
				name: 'Piu Piu',
				picture: require('../img/passaro.jpg')
			},
			{
				name: 'Nemo',
				picture: require('../img/peixe.jpg')
			},
		];



		let petsTable = pets.map((pet) => {
			return (
				<tr>
					<td><MediaBox src={pet.picture} caption="Pet picture" width="150"/></td>
					<td>{pet.name}</td>
					<td><Button>Details</Button></td>
				</tr>
			)
		});

		return(
			<div>
				<h4> Welcome {user.name} !</h4>
				Visão geral do profile aqui
				foto
				nome
				endereço
				telefone
				editar perfil
				numero de animais cadastrados
				<Tabs className='z-depth-1'>
					<Tab title="Pets" active>
						<Table>
							<thead>
								<tr>
									<th data-field="img">Pet</th>
									<th data-field="name">Name</th>
									<th data-field="details">Details</th>
								</tr>
							</thead>
							<tbody>
								{petsTable}
							</tbody>
							<Button>New pet</Button>
						</Table>
					</Tab>
					<Tab title="My Schedule">Products</Tab>
					<Tab title="Cart">Products</Tab>
				</Tabs>
			</div>
		)
	}
}