import React from 'react';

import {Table, Button, Row, Modal, Input, Col, MediaBox} from 'react-materialize';

export default class Pets extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			pets: [],
			petname: '',
			createdPet: 'false',
		}

		this.petToDelete = null

		if (this.props.user !== null){
			this.props.db.getPets('username', this.props.user.username).then(pet => this.setState({ pets: pet }));
		}

		this.createNewPet = this.createNewPet.bind(this);
		this.deletePet = this.deletePet.bind(this);
	}

	render(){

		let pets = []
		const isLoggedIn = (this.props.user !== null);
		if (isLoggedIn) pets = this.state.pets;

		// Sets a list of pets as a table
		// Each row represent a pet and has image, name and a button for more details
		// When the "details" button is pressed, a pop-up window appears with a larger version
		// of the image, the name of the pet and "delete" and "close" options.
		let petsTable = pets.map((pet, index) => {
			return (
				<tr>
					{/*Pet picture*/}
					<td><MediaBox src={pet.picture} caption="Pet picture" width="150"/></td>
					{/*Pet name*/}
					<td><Col>{pet.name}</Col></td>
					{/*Details option*/}
					<td>
						<Modal
						id={"pet"+pet.id}
						header={pet.name}
						trigger={<Button>Details</Button>}>
							{/*Pop-up window with more details*/}
							<Row>
								{/*Larger pet picture*/}
								<Col l={4}>
									<MediaBox src={pet.picture} caption="Pet picture" width="200"/>
								</Col>
								{/*Pet info*/}
								<Col l={4}>
									<h5>Name:</h5>
									<p>{pet.name}</p>
								</Col>
							</Row>
							{/*Delete option*/}
							<Button modal="close" onClick={ ()=> {
								this.petToDelete = pet;
								this.deletePet();
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
						{/*Colum names*/}
						<tr>
							<th data-field="img">Specie</th>
							<th data-field="name">Name</th>
							<th data-field="details">Details</th>
						</tr>
					</thead>
					<tbody>
						{petsTable}
					</tbody>
				</Table>
				<Row></Row>
				<Row></Row>
				{/*Add new pet option*/}
				<Modal
				header='Create new pet'
				trigger={<Button>New pet</Button>}>
					<Row>
						<Input id="petname" s={6} m={6} l={6} type="text" label="Pet Name" validate/>
					</Row>
					<Row>
					    <Input id="radio_dog" name='group1' type='radio' value='dog' label='Dog' checked="true"/>
					    <Input id="radio_cat" name='group1' type='radio' value='cat' label='Cat'/>
					    <Input id="radio_bird" name='group1' type='radio' value='bird' label='Bird'/>
					    <Input id="radio_fish" name='group1' type='radio' value='fish' label='Fish'/>
					</Row>
					{/*Create button*/}
					<Row className="left">
						<Button modal="close" onClick={this.createNewPet}>Create</Button>
					</Row>
				</Modal>
			</div>
		);
	}

	createNewPet(){
		let pic, petname, dog, cat, bird, fish;

		petname = document.getElementById("petname").value;

		dog = document.getElementById("radio_dog");
		cat = document.getElementById("radio_cat");
		bird = document.getElementById("radio_bird");
		fish = document.getElementById("radio_fish");

		if (dog.checked){
			pic = require('../img/silhueta_cachorro.png');
		}
		else if (cat.checked){
			pic = require('../img/silhueta_gato.png');
		}
		else if (bird.checked){
			pic = require('../img/silhueta_passaro.png');
		}
		else if (fish.checked){
			pic = require('../img/silhueta_peixe.png');
		}

		if(petname !== ''){
			let newPet = {
				name: petname,
				picture: pic,
				username: this.props.user.username
			}
			this.props.db.putPet(newPet).then(
				this.setState({createdPet: 'true'}));
		}
		this.props.db.getPets('username', this.props.user.username).then(pet => this.setState({ pets: pet }));
	}

	deletePet(){
		this.props.db.deletePet(this.petToDelete.id);
		this.props.db.getPets('username', this.props.user.username).then(pet => this.setState({ pets: pet }));
	}


}
