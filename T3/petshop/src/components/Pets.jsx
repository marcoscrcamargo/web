import React from 'react';

import {Table, Button, Row, Modal, Input, Col, MediaBox} from 'react-materialize';

export default class Pets extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			pets: [],
			petname: '',
			animal: 'dog',
			breed: '',
			age: '',
			createdPet: 'false',
		}

		this.petToDelete = null

		if (this.props.user !== null){
			this.getPets(this.props.user.username).then(pet => this.setState({ pets: pet }));
		}

		this.createNewPet = this.createNewPet.bind(this);
		this.handlePetnameChange = this.handlePetnameChange.bind(this);
//		this.handleAnimalChange = this.handleAnimalChange.bind(this);
		this.handleAgeChange = this.handleAgeChange.bind(this);
		this.handleBreedChange = this.handleBreedChange.bind(this);
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
					<td><MediaBox src={pet.value.picture} caption="Pet picture" width="150"/></td>
					{/*Pet name*/}
					<td><Col>{pet.value.name}</Col></td>
					{/*Details option*/}
					<td>
						<Modal
						id={"pet"+pet.value._id}
						header={pet.value.name}
						trigger={<Button>Details</Button>}>
							{/*Pop-up window with more details*/}
							<Row>
								{/*Larger pet picture*/}
								<Col l={4}>
									<MediaBox src={pet.value.picture} caption="Pet picture" width="200"/>
								</Col>
								{/*Pet info*/}
								<Col l={4}>
									<h5>Name:</h5>
									<p>{pet.value.name}</p>
									<h5>Animal:</h5>
									<p>{pet.value.animal}</p>
									<h5>Breed:</h5>
									<p>{pet.value.breed}</p>
									<h5>Age:</h5>
									<p>{pet.value.age}</p>
									<h5>ID:</h5>
									<p>{pet.value.chave}</p>
								</Col>
							</Row>
							{/*Delete option*/}
							<Button modal="close" onClick={ ()=> {
								console.log('delete')
								console.log(pet)
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
						<img id="profile_pic" src={require('../img/avatar.png')} height="250" alt="preview" />
					</Row>
					<Row>
						<Input s={6} m={6} l={6} type="file" label="Picture" validate onChange={this.previewFile}/>
					</Row>					<Row>
						<Input id="petname" s={6} m={6} l={6} type="text" label="Pet Name" onChange={this.handlePetnameChange} validate/>
					</Row>
					<Row>
						<Input id="breed" s={6} m={6} l={6} type="text" label="Breed" onChange={this.handleBreedChange} validate/>
					</Row>
					<Row>
						<Input id="Age" s={6} m={6} l={6} type="number" label="Age" onChange={this.handleAgeChange} min={0} validate/>
					</Row>
					<Row onClick={this.handleAnimalChange}>
					    <Input id="radio_dog" name='group1' type='radio' value='dog' label='Dog' checked/>
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

	async getPets(username){
		let response = await fetch('http://localhost:4000/pet');
		let pets = await response.json();
		let pet_from_user = pets.filter((pets) => {
			return pets.value.username === username
		});
		return pet_from_user;
	}

	handlePetnameChange(e){
		this.setState({petname: e.target.value});
	}

/*	handleAnimalChange(e){
		this.setState({animal: e.target.value});
	}
*/
	handleBreedChange(e){
		this.setState({breed: e.target.value});
	}

	handleAgeChange(e){
		this.setState({age: e.target.value});
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

	createNewPet(){
		let dog, cat, bird, fish, animalType;

		var url = 'http://127.0.0.1:4000/pet/';
		var preview = document.querySelector('#profile_pic');

		dog = document.getElementById("radio_dog");
		cat = document.getElementById("radio_cat");
		bird = document.getElementById("radio_bird");
		fish = document.getElementById("radio_fish");

		if (dog.checked){
			animalType = "Dog";
		}
		else if (cat.checked){
			animalType = "Cat";
		}
		else if (bird.checked){
			animalType = "Bird";
		}
		else if (fish.checked){
			animalType = "Fish";
		}

		console.log(animalType);

		if(this.state.petname !== ''){
			let newPet = {
				name: this.state.petname,
				animal: animalType,
				breed: this.state.breed,
				age: this.state.age,
				picture: preview.src,
				username: this.props.user.username
			}
			fetch(url, {
				headers: {
					'Content-type':'application/json'
				},
				method:'POST',
				body: JSON.stringify(newPet)
			}).then(() => {
				this.setState({createdPet: 'true'});
				this.getPets(this.props.user.username).then(pet => this.setState({ pets: pet }));
			});
		}
	}

	deletePet(){
		var url = 'http://127.0.0.1:4000/pet/'+this.petToDelete.id;
		fetch(url, {method: 'delete'}).then(()=>{
			this.getPets(this.props.user.username).then(pet => this.setState({ pets: pet }));
		});
	}


}
