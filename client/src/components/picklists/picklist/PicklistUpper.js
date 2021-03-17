import React from 'react';
import { CardBody, Button } from 'reactstrap';
import { connect } from 'react-redux';
import {
	clearCurrentPicklist,
	deletePicklist,
	updatePicklist,
} from '../../../flux/actions/picklistActions';
import { returnErrors } from '../../../flux/actions/errorActions';
import { useHistory } from 'react-router';

const PicklistUpper = ({
	picklist,
	currentPicklist,
	retrievePicklist,
	user,
	clearCurrentPicklist,
	deletePicklist,
	updatePicklist,
	returnErrors,
}) => {
	let history = useHistory();

	const handleDelete = (id) => {
		if (currentPicklist && id === currentPicklist._id) {
			clearCurrentPicklist();
		}
		deletePicklist(id);
	};

	const handleRetrieve = (picklist) => {
		if (!retrievePicklist) {
			let picklistToRetrieve = picklist;

			picklistToRetrieve.retriever_id = user._id;
			picklistToRetrieve.retriever_name = user.name;
			picklist.status = 'retrieving';

			updatePicklist(picklistToRetrieve);

			history.push('/retrieve');
		} else {
			returnErrors(
				'User already has a picklist in retrieving',
				'danger',
				null
			);
		}
	};

	const handleComplete = (picklist) => {
		let picklistToComplete = picklist;

		picklist.status = 'complete';

		updatePicklist(picklistToComplete);
	};

	return (
		<CardBody className='picklist-upper'>
			<Button
				className='remove-btn bg-1'
				name='remove-btn'
				onClick={(e) => {
					e.stopPropagation();
					handleDelete(picklist._id);
				}}>
				<i className='fas fa-trash-alt'></i> Delete
			</Button>
			{picklist.status === 'submitted' ? (
				<Button
					className='retrieve-btn bg-1'
					onClick={(e) => {
						e.stopPropagation();
						handleRetrieve(picklist);
					}}>
					<i className='fas fa-cart-arrow-down'></i> Retrieve
				</Button>
			) : picklist.status === 'retrieved' ? (
				<Button
					className='complete-btn bg-1'
					onClick={(e) => {
						e.stopPropagation();
						handleComplete(picklist);
					}}>
					<i className='fas fa-check'></i> Complete
				</Button>
			) : null}
		</CardBody>
	);
};

const mapStateToProps = (state) => ({
	currentPicklist: state.picklist.currentPicklist,
	retrievePicklist: state.picklist.retrievePicklist,
	user: state.auth.user,
});

export default connect(mapStateToProps, {
	clearCurrentPicklist,
	deletePicklist,
	updatePicklist,
	returnErrors,
})(PicklistUpper);
