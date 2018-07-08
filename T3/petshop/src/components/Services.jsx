import React from 'react';
import {Row, Col, Card, CardTitle, Modal, Input, Button } from 'react-materialize';

export default class Services extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			services: [],
			petsForUser: [],
			petname: null,
			time: null,
			date: null
		};

		this.servicetoSchedule = null
		this.getAllServices().then(item => this.setState({ services: item }));

		if (this.props.user !== null){
			this.props.db.getPets("username", this.props.user.username).then(item => this.setState({ petsForUser: item }));
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
			pet_list = this.state.petsForUser.map((pet) => {return(<option>{pet.name}</option>)})
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
											window.Materialize.toast('Service scheduled!', 2000)
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


	createNewSchedule(){
		let date = String(this.state.date);
		let time = String(this.state.time);
		let dt = date + " " + time;
		let petname = String(this.state.petname);
		let newSchedule = {
			name: this.servicetoSchedule.title,
			username: this.props.user.username,
			pet: petname,
			date: dt,
			picture: this.servicetoSchedule.img_file,
			description: this.servicetoSchedule.description,
			price: this.servicetoSchedule.price
		}
		this.props.db.putSchedule(newSchedule);
	}
}