import React from 'react';
import {Row, Col, Input, Table, Button, Modal} from 'react-materialize';

export default class ServicesManagement extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			services: [],
			serviceName: '',
			description: '',
			price: ''
		};

		this.serviceToDelete = null;

		// getting values from the db and assigning them to the users, products and services attributes
		this.getAllServices().then(item => this.setState({ services: item }));
		this.handleServiceName = this.handleServiceName.bind(this);
		this.handleDescription = this.handleDescription.bind(this);
		this.handlePrice = this.handlePrice.bind(this);
		this.createNewService = this.createNewService.bind(this);
		this.deleteService = this.deleteService.bind(this);
	}

	render(){
		let services = this.state.services;

		// for each service in services, runs the function
		let servicesTable = services.map((service, index) => {
			// this.setState({serviceName: service.value.serviceName});
			// this.setState({description: service.value.description});
			// this.setState({price: service.value.price});

			return (
				// creates a table with colums: Name, Description, Price and Edit
				<tr key={index}>
					<td>{service.value.title}</td>
					<td>{service.value.description}</td>
					<td>{service.value.price}</td>
					<td>
						<Modal
						header={service.value.title}
						trigger={<Button>Edit</Button>}>
							<Row>
								<Input id={"serviceTitle"+service.value._id} s={6} m={6} l={6} type="text" label="Service Name" defaultValue={service.value.title} onChange={this.handleServiceName} validate/>
							</Row>
							<Row>
								<Input id={"description"+service.value._id} s={6} m={6} l={6} type="textarea" label="Description" defaultValue={service.value.description} onChange={this.handleDescription} validate/>
							</Row>
							<Row>
								<Input id={"price"+service.value._id} s={6} m={6} l={6} type="text" label="Price" defaultValue={service.value.price} onChange={this.handlePrice} validate/>
							</Row>
							<Row className="left">
								<Button modal="close"
									onClick={(e) => {
										service.value.title = this.state.serviceName;
										service.value.description = this.state.description;
										service.value.price = this.state.price;

										var url = 'http://127.0.0.1:4000/product/';
										fetch(url, {
											headers: {
												'Content-type':'application/json'
											},
											method:'PUT',
											body: JSON.stringify(service)
										}).then(() => {
											this.getAllServices().then(item => this.setState({ services: item }));
										});
									}
								}>Edit</Button>
							</Row>
						</Modal>
					</td>
					<td>
						<Modal
						id={"product"+service.value._id}
						header={service.value.name}
						trigger={<Button>Delete</Button>}>
							{/*Pop-up window with more details*/}
							<Row>
								{/*Larger pet picture}
								<Col l={4}>
									<MediaBox src={product.value.picture} caption="Pet picture" width="200"/>
								</Col>}
								{/*Pet info*/}
								<Col l={4}>
									<h5>Service:</h5>
									<p>{service.value.title}</p>
									<h5>Description:</h5>
									<p>{service.value.description}</p>
									<h5>Price:</h5>
									<p>{service.value.price}</p>
								</Col>
							</Row>
							{/*Delete option*/}
							<Button modal="close" onClick={ ()=> {
								this.serviceToDelete = service;
								this.deleteService();
							}}> Delete </Button>
						</Modal>
					</td>
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
					<Row>
						<img id="profile_pic" src={require('../img/avatar.png')} height="250" alt="preview" />
					</Row>
					<Row>
						<Input s={6} m={6} l={6} type="file" label="Picture" validate onChange={this.previewFile}/>
					</Row>
					<Row>
						<Input id="serviceName" s={6} m={6} l={6} type="text" label="Service Name" onChange={this.handleServiceName} validate/>
					</Row>
					<Row>
						<Input id="description" s={6} m={6} l={6} type="textarea" label="Description" onChange={this.handleDescription} validate/>
					</Row>
					<Row>
						<Input id="price" s={6} m={6} l={6} type="text" label="Price" onChange={this.handlePrice} validate/>
					</Row>
					<Row className="left">
						<Button modal="close" onClick={this.createNewService}>Create New Service</Button>
					</Row>
				</Modal>
			</div>
		)
	}

	handleServiceName(e){
		this.setState({serviceName: e.target.value});
	}

	handleDescription(e){
		this.setState({description: e.target.value});
	}

	handlePrice(e){
		this.setState({price: e.target.value});
	}

	async getAllServices(){
		let response = await fetch('http://localhost:4000/service');
		let services = await response.json();
		return services;
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

	createNewService(){

		if(this.state.serviceName !== ''){
			var preview = document.querySelector('#profile_pic');
			var newService = {
				title: this.state.serviceName,
				description: this.state.description,
				price: this.state.price,
				img_file: preview.src
			}
		
			var url = 'http://127.0.0.1:4000/service/';

			fetch(url, {
				headers: {
					'Content-type':'application/json'
				},
				method:'POST',
				body: JSON.stringify(newService)
			}).then(() => {
				this.setState({createdService: 'true'});
				this.getAllServices().then(item => this.setState({ services: item }));
			});

		}

	}

	deleteService(){
		var url = 'http://127.0.0.1:4000/product/'+this.serviceToDelete.id;
		fetch(url, {method: 'delete'}).then(()=>{
			this.getAllServices().then(item => this.setState({ services: item }));
		});
	}

}