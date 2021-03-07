import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { returnErrors } from '../../flux/actions/errorActions';
import {
	updatePicklist,
	getCurrentPicklist,
} from '../../flux/actions/picklistActions';

const AddToCurrent = ({
	currentPicklist,
	updatePicklist,
	getCurrentPicklist,
	returnErrors,
	itemToAdd,
}) => {
	const handleClick = () => {
		let picklistToUpdate = currentPicklist;

		if (picklistToUpdate.items.includes(itemToAdd)) {
			returnErrors(
				`${picklistToUpdate.list_name} already has ${itemToAdd.name}. To change quantities, go to current.`,
				'danger',
				null
			);
		} else {
			picklistToUpdate.items.push(itemToAdd);
			updatePicklist(picklistToUpdate);

			returnErrors(
				`${itemToAdd.name} added to ${picklistToUpdate.list_name}.`,
				'success',
				null
			);
		}
	};

	useEffect(() => {
		getCurrentPicklist();
	}, [updatePicklist, getCurrentPicklist]);

	return (
		<div className='add-to-current bg-1 text-white'>
			<Button className='add-to-current-btn' onClick={handleClick}>
				<i className='fas fa-plus'></i> Add to Current Picklist
			</Button>
		</div>
	);
};

const mapStateToProps = (state) => ({
	currentPicklist: state.picklist.currentPicklist,
});

export default connect(mapStateToProps, {
	updatePicklist,
	getCurrentPicklist,
	returnErrors,
})(AddToCurrent);
