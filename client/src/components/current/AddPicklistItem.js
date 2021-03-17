import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { connect } from 'react-redux';
import {
	addPicklistItem,
	updatePicklist,
} from '../../flux/actions/picklistActions';
import { returnErrors } from '../../flux/actions/errorActions';

const AddPicklistItem = ({
	currentPicklist,
	addPicklistItem,
	updatePicklist,
	returnErrors,
}) => {
	const [input, setInput] = useState('');
	const [scan, setScan] = useState(null);
	const form = document.querySelector('#add-item-form');

	const handleKeypress = (e) => {
		if (e.charCode === 13) {
			input === ''
				? handleSubmit(e, scan, 'scanner')
				: handleSubmit(e, input, 'form return');
		} else {
			const char = String.fromCharCode(e.charCode);
			scan === '' ? setScan(`${char}`) : setScan(`${scan}${char}`);
		}
	};

	const handleChangeInput = (e) => setInput(e.target.value);

	const handleSubmit = async (e, data, src) => {
		e.preventDefault();
		console.log(`submit ${data} from ${src}`);

		const duplicate = (item) => item.upcs.includes(data);

		if (data === '') {
			returnErrors('No data entered', 'danger', null);
		} else if (currentPicklist.items.some(duplicate)) {
			// If the item scanned is a duplicate, increase qty by one and update
			let picklistToUpdate = currentPicklist;

			picklistToUpdate.items = picklistToUpdate.items.filter((item) =>
				item.upcs.includes(data) ? item.qty++ : item
			);
			updatePicklist(picklistToUpdate);
		} else {
			addPicklistItem(currentPicklist, data);
		}

		// Clear input field and state
		form.reset();
		setInput('');
		setScan('');
		src !== 'scanner' && form.focus();
	};

	useEffect(() => {
		if (!document.querySelector('#add-item-form').hasFocus) {
			document.addEventListener('keypress', handleKeypress);

			return () => {
				document.removeEventListener('keypress', handleKeypress);
			};
		}
	});

	return (
		<Form
			onSubmit={(e) => handleSubmit(e, input, 'form return')}
			autoComplete='off'
			id='add-item-form'
			className='add-picklist-item search-bar'>
			<InputGroup>
				<Input
					type='text'
					id='item'
					placeholder='Input UPC or scan barcode...'
					onChange={handleChangeInput}
					onBlur={() => {
						setScan('');
					}}></Input>
				{input !== '' && (
					<InputGroupAddon addonType='append'>
						<Button
							onClick={(e) =>
								handleSubmit(e, input, 'Add button')
							}
							className='bg-1'>
							Add Item
						</Button>
					</InputGroupAddon>
				)}
			</InputGroup>
		</Form>
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
