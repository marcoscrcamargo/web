import React from 'react';
import {Container, Row, Col, Card, CardTitle} from 'react-materialize';

export default class Products extends React.Component {
	render() {
		return (
			<Container>
				<Row>

					<Col s={2}>
						<Card className='small'
							header={<CardTitle image={require('../img/prod.jpg')}></CardTitle>}
							actions={[<a href='#'>Buy</a>]}>
							Ração pra animal doente.
						</Card>
					</Col>


				</Row>
			</Container>
		);
	}
}