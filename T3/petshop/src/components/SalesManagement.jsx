import React from 'react';
import {Row, Col, Input, Table, Button, Modal} from 'react-materialize';

export default class ServicesManagement extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sales: []
		};

		// getting values from the db and assigning them to the users, products and services attributes
		this.getAllSales().then(item => this.setState({ sales: item }));
	}

	render(){
		let sales = this.state.sales;

		// for each sale in sales, runs the function
		let salesTable = sales.map((sale, index) => {
			// this.setState({serviceName: service.value.serviceName});
			// this.setState({description: service.value.description});
			// this.setState({price: service.value.price});

			console.log(sale);

			return (
				// creates a table with colums: Product, Userame, Quantity, Total Price and Date
				<tr key={index}>
					<td>{sale.value.product}</td>
					<td>{sale.value.username}</td>
					<td>{sale.value.quantity}</td>
					<td>{parseInt(sale.value.price) * parseInt(sale.value.quantity)}</td>
					<td>{sale.value.date}</td>
				</tr>
			)
		});

		// how the screen should be rendered
		return(
			<div>
				<Table>
					<thead>
						{/*Names of the colums*/}
						<tr>
							<th data-field="product">Product</th>
							<th data-field="username">Username</th>
							<th data-field="quantity">Quantity</th>
							<th data-field="totalprice">Total Price</th>
							<th data-field="date">Date</th>
						</tr>
					</thead>

					{/*Table content*/}
					<tbody>
						{salesTable}
					</tbody>
				</Table>
			</div>
		)
	}

	async getAllSales(){
		let response = await fetch('http://localhost:4000/sale');
		let sales = await response.json();
		return sales;
	}
}