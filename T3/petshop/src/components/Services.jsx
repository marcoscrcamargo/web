import React from 'react';
import {Row, Col, Card, CardTitle, Modal, Input, Button } from 'react-materialize';

export default class Services extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			schedules: [],
			services: [],
			petsForUser: [],
			petname: null,
			time: null,
			date: null
		};

		this.servicetoSchedule = null
		this.getAllSchedules().then(item => this.setState({ schedules: item }));
		this.getAllServices().then(item => this.setState({ services: item }));

		if (this.props.user !== null){
			this.getPets(this.props.user.username).then(item => this.setState({ petsForUser: item }));
		}

		this.handleChangeDate = this.handleChangeDate.bind(this);
		this.handleChangeTime = this.handleChangeTime.bind(this);
		this.handleChangePetName = this.handleChangePetName.bind(this);
		this.createNewSchedule = this.createNewSchedule.bind(this);

	}

	handleChangeDate(event){
		this.setState({date: event.target.value});
	}

	handleChangeTime(event){
		this.setState({time: event.target.value})
	}

	handleChangePetName(event){
		this.setState({petname: event.target.value});
	}

	render() {
		let services, serviceList, pet_list;

		services = this.state.services;

		if (this.props.user === null){
			serviceList = services.map((service) => {
				service = service.value;
					return (
						<Col s={6} m={4} l={3}>
							<Card className='medium'
								/*Service image*/
								header={<CardTitle image={service.img_file}></CardTitle>}
								/*Price/schedule (clickable) */
								actions={[
									<Modal
									header='Schedule a service'
									trigger={<p className="center" style={{'margin': '0 0 0 0'}}><a>Schedule for ${service.price}</a></p>}>
										Please login first!
									</Modal>
									]}>
								{/*Service name*/}
								<h5>{service.title}</h5>
								{/*Service description*/}
								{service.description}
							</Card>
						</Col>)
				});
		}
		else{
			pet_list = this.state.petsForUser.map((pet) => {return(<option>{pet.value.name}</option>)})
			// fills a list with cards with name, image, price and a short description about each service
			serviceList = services.map((service) => {
					service = service.value;
					return (
						<Col s={6} m={4} l={3}>
							<Card className='medium'
								/*Service image*/
								header={<CardTitle image={service.img_file}></CardTitle>}
								/*Price/schedule (clickable) */
								actions={[
									<Modal
									header={'Schedule '+service.title}
									trigger={<p className="center" style={{'margin': '0 0 0 0'}}><a>Schedule for ${service.price}</a></p>}>
										Pet:
										<Row>
											<Input id="inputname" s={12} type='select' label="Pet selection" defaultValue='2' onChange={this.handleChangePetName}>
												<option>-</option>
												{pet_list}
											</Input>
										</Row>
										Date:
										<Row>
										  <Input id="inputdate" name='on' type='date' onChange={this.handleChangeDate}/>
										</Row>
										Time:
										<Row>
										  <Input id="inputime" name='on' type='time' onChange={this.handleChangeTime}/>
										</Row>
										{/*Schedule button*/}
										<Row className="left"><Button modal="close" onClick={ ()=> {
											this.servicetoSchedule = service;
											this.createNewSchedule();
										}}>Schedule</Button></Row>
									</Modal>
									]}>
								{/*Service name*/}
								<h5>{service.title}</h5>
								{/*Service description*/}
								{service.description}
							</Card>
						</Col>)
				});
		}
		// returns the list of cards
		return (
			<Row>
				{serviceList}
			</Row>
		);
	}

	async getAllServices(){
		let response = await fetch('http://localhost:4000/service');
		let services = await response.json();
		return services;
	}

	async getPets(username){
		let response = await fetch('http://localhost:4000/pet');
		let pets = await response.json();
		let pet_from_user = pets.filter((pets) => {
			return pets.value.username === username
		});
		return pet_from_user;
	}

	async getAllSchedules(){
		let response = await fetch('http://localhost:4000/schedule');
		let schedules = await response.json();
		return schedules;
	}

	createNewSchedule(){

		let date = String(this.state.date);
		let time = String(this.state.time);
		let dt = date + " " + time;
		var allSchedules = this.state.schedules;

		var conflict = allSchedules.filter(schedule => schedule.value.date === dt && schedule.value.name === this.servicetoSchedule.title)

		if(conflict.length !== 0){
			window.Materialize.toast("Hour and date not available for this service, try again ", 5000);
			return;
		}

		let petname = String(this.state.petname);
		let newSchedule = {
			name: this.servicetoSchedule.title,
			username: this.props.user.username,
			pet: petname,
			date: dt,
			img_file: this.servicetoSchedule.img_file,
			description: this.servicetoSchedule.description,
			price: this.servicetoSchedule.price
		}
		var url = 'http://127.0.0.1:4000/schedule';
		fetch(url, {
			headers: {
				'Content-type':'application/json'
			},
			method:'POST',
			body: JSON.stringify(newSchedule)
		}).then(() => {
			window.Materialize.toast("Service scheduled!", 2000);
		});
	}
}