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
import {
	addPicklistItem,
	updatePicklist,
} from '../../../flux/actions/picklistActions';
import { returnErrors } from '../../../flux/actions/errorActions';

const AddPicklistItem = ({
	currentPicklist,
	addPicklistItem,
	updatePicklist,
	returnErrors,
}) => {
	const [upc, setUPC] = useState('');

	// Clear input after adding item and reset focus to input
	const clearFields = () => {
		const form = document.querySelector('#add-item-form');
		form.reset();
		setUPC('');
	};

	const handleChangeUPC = (e) => setUPC(e.target.value);

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		const duplicate = (item) => item.upcs.includes(upc);

		if (upc === '') {
			returnErrors('UPC Input field cannot be blank', 'danger', null);
			console.log('UPC Input field cannot be blank');
		} else if (currentPicklist.items.some(duplicate)) {
			// If the item scanned is a duplicate, increase qty by one and update
			let picklistToUpdate = currentPicklist;

			picklistToUpdate.items = picklistToUpdate.items.filter((item) =>
				item.upcs.includes(upc) ? item.qty++ : item
			);
			updatePicklist(picklistToUpdate);
		} else {
			addPicklistItem(currentPicklist, upc);
		}

		// Clear Input Field
		clearFields();
	};

	return (
		<div>
			<Form
				onSubmit={(e) => handleOnSubmit(e)}
				autoComplete='off'
				id='add-item-form'>
				<FormGroup>
					<InputGroup>
						<Input
							type='text'
							name='upc'
							id='item'
							placeholder='Input UPC or scan barcode...'
							onChange={handleChangeUPC}
							autoFocus></Input>
						<InputGroupAddon addonType='append'>
							<Button
								onClick={(e) => handleOnSubmit(e)}
								className='bg-1'>
								Add Item
							</Button>
						</InputGroupAddon>
					</InputGroup>
				</FormGroup>
			</Form>
		</div>
	);
};

const mapStateToProps = (state) => ({
	currentPicklist: state.picklist.currentPicklist,
});

export default connect(mapStateToProps, {
	addPicklistItem,
	updatePicklist,
	returnErrors,
})(AddPicklistItem);
