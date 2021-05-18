import React, { useState, useEffect } from 'react';
import { Button, Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { connect } from 'react-redux';
import { returnErrors } from '../../flux/actions/errorActions';
import { updatePicklist } from '../../flux/actions/picklistActions';

const GetRetrieveItem = ({
	retrievePicklist,
	updatePicklist,
	returnErrors,
}) => {
	const [input, setInput] = useState('');
	const [scan, setScan] = useState('');
	const form = document.querySelector('#retrieve-item-form');

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

		const validUpc = (item) =>
			item.upcs.includes(data) && item.resolved === 'requested';

		if (data === '') {
			returnErrors('No data entered', 'danger', null);
		} else if (retrievePicklist.items.some(validUpc)) {
			// If retrievePicklist contains item pertaining to scanned UPC
			let picklistToUpdate = retrievePicklist;

			picklistToUpdate.items = picklistToUpdate.items.filter((item) =>
				item.upcs.includes(data) ? (item.resolved = 'retrieved') : item
			);
			updatePicklist(picklistToUpdate);
		} else {
			returnErrors('Nothing to retrieve', 'danger', null);
		}

		// Clear input field and state
		form.reset();
		setInput('');
		setScan('');
		src !== 'scanner' && form.focus();
	};

	useEffect(() => {
		if (!document.querySelector('#retrieve-item-form').hasFocus) {
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
			id='retrieve-item-form'
			className='get-retrieve-item search-bar'>
			<InputGroup>
				<Input
					type='text'
					id='r-item'
					placeholder='Input UPC or scan barcode...'
					onChange={handleChangeInput}
					autoFocus></Input>
				{input !== '' && (
					<InputGroupAddon addonType='append'>
						<Button
							onClick={(e) =>
								handleSubmit(e, input, 'Retrieve button')
							}>
							Retrieve Item
						</Button>
					</InputGroupAddon>
				)}
			</InputGroup>
		</Form>
	);
};

const mapStateToProps = (state) => ({
	retrievePicklist: state.picklist.retrievePicklist,
});

export default connect(mapStateToProps, {
	updatePicklist,
	returnErrors,
})(GetRetrieveItem);
