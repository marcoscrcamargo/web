import React from 'react';
import {Row, Col, Input, Tabs, Tab, Table, Button, Modal, MediaBox} from 'react-materialize';

export default class ProductsManagement extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			products: [],
			productName: '',
			description: '',
			price: '',
			createdProduct: false
		};

		this.productToDelete = null;

		// getting values from the db and assigning them to the users, products and services attributes
		this.getAllProducts().then(item => this.setState({ products: item }));
		this.handleProductName = this.handleProductName.bind(this);
		this.handleDescription = this.handleDescription.bind(this);
		this.handlePrice = this.handlePrice.bind(this);
		this.createNewProduct = this.createNewProduct.bind(this);
		this.editProduct = this.createNewProduct.bind(this);

	}

	render(){
		let products = this.state.products;

		// for each product in products, runs the function
		let productsTable = products.map((prod, index) => {
			return (
				// creates a table with colums: Name, Description, Price and Edit
				<tr key={index}>
					<td>{prod.value.name}</td>
					<td>{prod.value.description}</td>
					<td>{prod.value.price}</td>
					<td>
						<Modal
						header={prod.value.name}
						trigger={<Button>Edit</Button>}>
							<Row>
								<Input id="productName" s={6} m={6} l={6} type="text" label="Product Name" defaultValue={prod.value.name} validate/>
							</Row>
							<Row>
								<Input id="description" s={6} m={6} l={6} type="textarea" label="Description" defaultValue={prod.value.description} validate/>
							</Row>
							<Row>
								<Input id="price" s={6} m={6} l={6} type="text" label="Price" defaultValue={prod.value.price} validate/>
							</Row>
							<Row className="left">
								<Button modal="close"
									onChange={(e) => {
										prod.value.name = 'editou';
										prod.value.description = 'editou';
										prod.value.price = '100';

										var url = 'http://127.0.0.1:4000/product/';
										fetch(url, {
											headers: {
												'Content-type':'application/json'
											},
											method:'PUT',
											body: JSON.stringify(prod)
										}).then(() => {
											this.getAllProducts().then(item => this.setState({ products: item }));
										});
									}
								}>Edit</Button>
							</Row>
						</Modal>
					</td>
					<td>
						<Modal
						id={"product"+prod.value._id}
						header={prod.value.name}
						trigger={<Button>Delete</Button>}>
							{/*Pop-up window with more details*/}
							<Row>
								{/*Larger pet picture}
								<Col l={4}>
									<MediaBox src={product.value.picture} caption="Pet picture" width="200"/>
								</Col>}
								{/*Pet info*/}
								<Col l={4}>
									<h5>Name:</h5>
									<p>{prod.value.name}</p>
									<h5>Description:</h5>
									<p>{prod.value.description}</p>
									<h5>Price:</h5>
									<p>{prod.value.price}</p>
								</Col>
							</Row>
							{/*Delete option*/}
							<Button modal="close" onClick={ ()=> {
								this.productToDelete = prod;
								this.deleteProduct();
							}}> Delete </Button>
						</Modal>
					</td>
				</tr>
			)
		});
		
		return(
			<div>
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
					<Row>
						<img id="profile_pic" src={require('../img/avatar.png')} height="250" alt="preview" />
					</Row>
					<Row>
						<Input s={6} m={6} l={6} type="file" label="Picture" validate onChange={this.previewFile}/>
					</Row>

					<Row>
						<Input id="productName" s={6} m={6} l={6} type="text" label="Product Name" onChange={this.handleProductName} validate/>
					</Row>
					<Row>
						<Input id="description" s={6} m={6} l={6} type="textarea" label="Description" onChange={this.handleDescription} validate/>
					</Row>
					<Row>
						<Input id="price" s={6} m={6} l={6} type="text" label="Price" onChange={this.handlePrice} validate/>
					</Row>
					<Row className="left">
						<Button modal="close" onClick={this.createNewProduct}>Create New Product</Button>
					</Row>
				</Modal>
			</div>
		);
	}

	handleProductName(e){
		this.setState({productName: e.target.value});
	}

	handleDescription(e){
		this.setState({description: e.target.value});
	}

	handlePrice(e){
		this.setState({price: e.target.value});
	}


	async getAllProducts(){
		let response = await fetch('http://localhost:4000/product');
		let products = await response.json();
		return products;
	}

	previewFile() {
		var preview = document.querySelector('#profile_pic');
		var file	= document.querySelector('input[type=file]').files[0];
		var reader  = new FileReader();

		reader.addEventListener("load", () => {
			preview.src = reader.result;
		}, false);

		if (file) {
			reader.readAsDataURL(file);
		}
	}

	createNewProduct(){
		if(this.state.productName !== ''){
			var preview = document.querySelector('#profile_pic');
			var newProduct = {
				name: this.state.productName,
				description: this.state.description,
				price: this.state.price,
				img_file: preview.src
			}
		
			var url = 'http://127.0.0.1:4000/product/';

			fetch(url, {
				headers: {
					'Content-type':'application/json'
				},
				method:'POST',
				body: JSON.stringify(newProduct)
			}).then(() => {
				this.setState({createdProduct: 'true'});
				this.getAllProducts().then(item => this.setState({ products: item }));
			});

		}

	}

	deleteProduct(){
		var url = 'http://127.0.0.1:4000/product/'+this.productToDelete.id;
		fetch(url, {method: 'delete'}).then(()=>{
			this.getAllProducts().then(item => this.setState({ products: item }));
		});
	}

}