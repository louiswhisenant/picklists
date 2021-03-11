import React, { Fragment, useState, useEffect } from 'react';
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

	const handleRetrieve = (e, _id) => {
		e.preventDefault();

		console.log('item retrieved');
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
				picklist.items.map(({ _id, name, size, qty }) => (
					<Fragment key={_id}>
						<Collapse isOpen={isOpen === _id}>
							<CardBody className='item-not-found'>
								<Button
									className='item-not-found-btn bg-1 mr-2'
									size='sm'
									name='cancel-btn'
									onClick={(e) => handleCancel(e, _id)}>
									<i className='fas fa-ban'></i> Not Found
								</Button>
							</CardBody>
						</Collapse>

						<ListGroupItem
							onClick={() => handleToggle(_id)}
							className='d-flex align-items-center text-dark'>
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
							<CardBody className='retrieve-item'>
								<Button
									className='retrieve-item-btn'
									onClick={(e) => {
										handleRetrieve(e, _id);
									}}>
									<i className='fas fa-check'></i> Retrieve
								</Button>
							</CardBody>
						</Collapse>
					</Fragment>
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
