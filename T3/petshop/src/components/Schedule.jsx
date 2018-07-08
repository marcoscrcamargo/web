import React from 'react';

import {Table, Button, Row, Modal, Col, MediaBox} from 'react-materialize';

export default class Schedule extends React.Component{

	constructor(props){
		super(props);

		this.state = {schedules: []}
		this.scheduleToDelete = null

		if (this.props.user !== null)
			this.getSchedule(this.props.user.username).then(schedule => this.setState({ schedules: schedule }));

		this.deleteSchedule = this.deleteSchedule.bind(this);

	}

	render(){
		const isLoggedIn = (this.props.user !== null);
		let schedule = [];

		if (isLoggedIn) schedule = this.state.schedules;

		let scheduleTable = schedule.map((service) => {
			return (
				<tr>
					{/*Service name*/}
					<td>{service.value.name}</td>
					{/*pet name*/}
					<td>{service.value.pet}</td>
					{/*date and time*/}
					<td>{service.value.date}</td>
					{/*service price*/}
					<td>$ {service.value.price}</td>

					{/*Details option*/}
					<td>
						<Modal
						header={service.value.name}
						trigger={<Button>Details</Button>}>
							{/*Pop-up window with more details*/}
							<Row>
								{/*Larger pet picture*/}
								<Col l={4}>
									<MediaBox src={service.value.img_file} caption="Service picture" width="200"/>
								</Col>
								{/*Pet info*/}
								<Col l={4}>
									<h5>Service:</h5>
									<p>{service.value.name}</p>
									<h5>Description:</h5>
									<p>{service.value.description}</p>
									<h5>Pet:</h5>
									<p>{service.value.pet}</p>
									<h5>Date:</h5>
									<p>{service.value.date}</p>
									<h5>Price:</h5>
									<p>$ {service.value.price}</p>
								</Col>
							</Row>
							{/*Delete option*/}
							<Row className="left"><Button modal="close" onClick={ ()=> {
								this.scheduleToDelete = service;
								this.deleteSchedule();
							}}> Delete </Button></Row>
						</Modal>
					</td>
				</tr>
			)
		});

		return(
			<Table>
				<thead>
					{/*Colum names*/}
					<tr>
						<th data-field="img">Service</th>
						<th data-field="name">Pet</th>
						<th data-field="date">Date</th>
						<th data-field="price">Price</th>
						<th data-field="details">Details</th>
					</tr>
				</thead>
				<tbody>
					{scheduleTable}
				</tbody>
			</Table>
		);
	}

	async getSchedule(username){
		let response = await fetch('http://localhost:4000/schedule');
		let schedules = await response.json();
		let schedule_from_user = schedules.filter((schedules) => {
			return schedules.value.username === username
		});
		return schedule_from_user;
	}

	deleteSchedule(){
		var url = 'http://127.0.0.1:4000/schedule/'+this.scheduleToDelete.id;
		fetch(url, {method: 'delete'}).then(()=>{
			this.getSchedule(this.props.user.username).then(schedule => this.setState({ schedules: schedule }));
		});
	}

}