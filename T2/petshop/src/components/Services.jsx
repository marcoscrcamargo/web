import React from 'react';
import {Row, Col, Card, CardTitle, Modal, Input, Button} from 'react-materialize';

export default class Services extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			services: [],
			petsForUser: [],
		};

		this.servicetoSchedule = null
		this.props.db.getAllServices().then(item => this.setState({ services: item }));

		if (this.props.user !== null){
			this.props.db.getPets("username", this.props.user.username).then(item => this.setState({ petsForUser: item }));
		}

		this.createNewSchedule = this.createNewSchedule.bind(this);
	}

	render() {
		let services, serviceList, pets, pet_list;

		services = this.state.services;

		if (this.props.user === null){
			serviceList = services.map((service) => {
					return (
						<Col s={6} m={4} l={3}>
							<Card className='medium'
								/*Service image*/
								header={<CardTitle image={service.img_file}></CardTitle>}
								/*Price/schedule (clickable) */
								actions={[
									<Modal
									header='Schedule a service'
									trigger={<Button>Schedule ({service.price})</Button>}>
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
					return (
						<Col s={6} m={4} l={3}>
							<Card className='medium'
								/*Service image*/
								header={<CardTitle image={service.img_file}></CardTitle>}
								/*Price/schedule (clickable) */
								actions={[
									<Modal
									header='Schedule a service'
									trigger={<Button>Schedule ({service.price})</Button>}>
										Pet:
										<Row>
											<Input s={12} type='select' label="Pet selection" defaultValue='2'>
												{pet_list}
											</Input>
										</Row>
										Date:
										<Row>
										  <Input id="inputdate" name='on' type='date'/>
										</Row>
										Time:
										<Row>
										  <Input id="inputime" name='on' type='time'/>
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

	createNewSchedule(){
		let date = String(document.getElementById("inputdate").value);
		let time = String(document.getElementById("inputime").value);
		let newSchedule = {
			name: this.servicetoSchedule.title,
			username: this.props.user.username,
			pet: 'Marleyeeu',
			date: date + " " + time,
			picture: this.servicetoSchedule.img_file,
			description: this.servicetoSchedule.description
		}
		this.props.db.putSchedule(newSchedule);
	}
}