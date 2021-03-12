import React, { Fragment } from 'react';
import {
	Card,
	CardBody,
	Container,
	Form,
	FormGroup,
	InputGroup,
	Input,
	InputGroupAddon,
	ListGroup,
	ListGroupItem,
} from 'reactstrap';

export const SkeletonCard = () => {
	return (
		<Card className='w-100 bg-3 border-3 mb-2 picklist-skeleton'>
			<CardBody className='card-body-skeleton d-flex align-items-center'>
				<div className='picklist-info-skeleton'>
					<h4 className='card-title card-title-skeleton'>&nbsp;</h4>
					<h5 className='card-subtitle text-dark card-subtitle-skeleton'>
						&nbsp;
					</h5>
					<small className='date-skeleton'>
						Oct 12 2021, 11:59PM
					</small>
				</div>
				<div className='picklist-status-skeleton ml-auto'>&nbsp;</div>
			</CardBody>
		</Card>
	);
};

export const SkeletonCurrent = () => {
	return (
		<Fragment>
			<Container className='current-picklist-skeleton'>
				<div className='current-header-skeleton'>
					<h1 className='text-center current-title-skeleton'>
						&nbsp;
					</h1>
				</div>
				<Form>
					<FormGroup>
						<InputGroup>
							<Input disabled></Input>
							<InputGroupAddon addonType='append'>
								<div className='add-item-btn-skeleton'>
									&nbsp;
								</div>
							</InputGroupAddon>
						</InputGroup>
					</FormGroup>
				</Form>
				<ListGroup>
					<ListGroupItem>
						<p className='name-skeleton'>&nbsp;</p>
						<p className='qty-skeleton'>&nbsp;</p>
					</ListGroupItem>
					<ListGroupItem>
						<p className='name-skeleton'>&nbsp;</p>
						<p className='qty-skeleton'>&nbsp;</p>
					</ListGroupItem>
					<ListGroupItem>
						<p className='name-skeleton'>&nbsp;</p>
						<p className='qty-skeleton'>&nbsp;</p>
					</ListGroupItem>
				</ListGroup>
				<Container className='fixed fixed-bottom px-5 mb-5'>
					<div className='submit-btn-skeleton my-5'>&nbsp;</div>
				</Container>
			</Container>
		</Fragment>
	);
};
