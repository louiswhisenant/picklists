import React, { useState } from 'react';
import {
	Button,
	Form,
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon,
} from 'reactstrap';
import { connect } from 'react-redux';
import { returnErrors } from '../../flux/actions/errorActions';
import { updatePicklist } from '../../flux/actions/picklistActions';

const GetRetrieveItem = ({
	retrievePicklist,
	updatePicklist,
	returnErrors,
}) => {
	const [upc, setUPC] = useState('');

	// Clear input after adding item and reset focus to input
	const clearFields = () => {
		const form = document.querySelector('#retrieve-item-form');
		form.reset();
		setUPC('');
	};

	const handleChangeUPC = (e) => setUPC(e.target.value);

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		const validUpc = (item) =>
			item.upcs.includes(upc) && item.resolved === 'requested';

		if (upc === '') {
			returnErrors('UPC Input field cannot be blank', 'danger', null);
		} else if (retrievePicklist.items.some(validUpc)) {
			// If retrievePicklist contains item pertaining to scanned UPC
			let picklistToUpdate = retrievePicklist;

			picklistToUpdate.items = picklistToUpdate.items.filter((item) =>
				item.upcs.includes(upc) ? (item.resolved = 'retrieved') : item
			);
			updatePicklist(picklistToUpdate);
		} else {
			returnErrors('Nothing to retrieve', 'danger', null);
		}

		// Clear Input Field
		clearFields();
	};

	return (
		<div>
			<Form
				onSubmit={(e) => handleOnSubmit(e)}
				autoComplete='off'
				id='retrieve-item-form'>
				<FormGroup>
					<InputGroup>
						<Input
							type='text'
							name='upc'
							id='r-item'
							placeholder='Input UPC or scan barcode...'
							onChange={handleChangeUPC}
							autoFocus></Input>
						<InputGroupAddon addonType='append'>
							<Button
								onClick={(e) => handleOnSubmit(e)}
								className='bg-1'>
								Retrieve Item
							</Button>
						</InputGroupAddon>
					</InputGroup>
				</FormGroup>
			</Form>
		</div>
	);
};

const mapStateToProps = (state) => ({
	retrievePicklist: state.picklist.retrievePicklist,
});

export default connect(mapStateToProps, {
	updatePicklist,
	returnErrors,
})(GetRetrieveItem);
