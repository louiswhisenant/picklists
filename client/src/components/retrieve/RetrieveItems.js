import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	ListGroup,
	ListGroupItem,
	Button,
	CardBody,
	Collapse,
} from 'reactstrap';
import { returnErrors } from '../../flux/actions/errorActions';
import { updatePicklist } from '../../flux/actions/picklistActions';

const RetrieveItems = ({ retrievePicklist, updatePicklist, returnErrors }) => {
	const [isOpen, setIsOpen] = useState('');
	const [picklist, setPicklist] = useState([]);

	const handleToggle = (id) => {
		if (isOpen === id) {
			setIsOpen('');
		} else {
			setIsOpen(id);
		}
	};

	const handleCancel = (e, id) => {
		e.preventDefault();

		let picklistToUpdate = retrievePicklist;

		picklistToUpdate.items = picklistToUpdate.items.filter((item) =>
			item._id === id ? (item.resolved = 'cancelled') : item
		);

		updatePicklist(picklistToUpdate);
	};

	const handleRetrieve = (e, id) => {
		e.preventDefault();

		let picklistToUpdate = retrievePicklist;

		picklistToUpdate.items = picklistToUpdate.items.filter((item) =>
			item._id === id ? (item.resolved = 'retrieved') : item
		);
		updatePicklist(picklistToUpdate);
	};

	useEffect(() => {
		setPicklist(retrievePicklist);
	}, [retrievePicklist]);

	useEffect(() => {
		const requestedItem = (item) => item.resolved === 'requested';
		if (!retrievePicklist.items.some(requestedItem)) {
			let picklistToUpdate = retrievePicklist;
			picklistToUpdate.status = 'retrieved';

			updatePicklist(picklistToUpdate);
			returnErrors(
				`${picklistToUpdate.list_name} retrieved`,
				'success',
				null
			);
		}
		// eslint-disable-next-line
	}, [retrievePicklist, updatePicklist]);

	return (
		<ListGroup className='retrieve-items-list'>
			{picklist.items &&
				picklist.items.map(({ _id, name, size, qty, resolved }) => (
					<div className={`retrieve-item ${resolved}`} key={_id}>
						<Collapse isOpen={isOpen === _id}>
							<CardBody className='item-not-found'>
								{resolved !== 'cancelled' ? (
									<Button
										className='item-not-found-btn'
										size='sm'
										name='cancel-btn'
										onClick={(e) => handleCancel(e, _id)}>
										<i className='fas fa-ban'></i> Not Found
									</Button>
								) : (
									<div className='already-not-found'>
										Item not found
									</div>
								)}
							</CardBody>
						</Collapse>

						<ListGroupItem
							onClick={() => handleToggle(_id)}
							className={`d-flex align-items-center text-dark ${resolved}`}>
							<div className='resolved-status'>
								{resolved === 'requested' ? (
									<i className='fas fa-search c-retrieving'></i>
								) : resolved === 'retrieved' ? (
									<i className='fas fa-check c-found'></i>
								) : (
									<i className='fas fa-ban c-not-found'></i>
								)}
							</div>
							<div className='retrieve-items-name'>
								{size && (
									<strong className='retrieve-items-size'>
										{size}&nbsp;
									</strong>
								)}
								{name}
							</div>
							<div className='retrieve-items-widget d-inline-block ml-auto d-flex'>
								{qty}
							</div>
						</ListGroupItem>

						<Collapse isOpen={isOpen === _id}>
							<CardBody className='retrieve-item-success'>
								{resolved !== 'retrieved' ? (
									<Button
										className='retrieve-item-success-btn'
										onClick={(e) => {
											handleRetrieve(e, _id);
										}}>
										<i className='fas fa-check'></i>{' '}
										Retrieve
									</Button>
								) : (
									<div className='already-retrieved'>
										Item Retrieved
									</div>
								)}
							</CardBody>
						</Collapse>
					</div>
				))}
		</ListGroup>
	);
};

const mapStateToProps = (state) => ({
	retrievePicklist: state.picklist.retrievePicklist,
});

export default connect(mapStateToProps, { updatePicklist, returnErrors })(
	RetrieveItems
);
