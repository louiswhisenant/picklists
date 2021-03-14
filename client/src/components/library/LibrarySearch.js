import React, { useState } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import {
	searchLibrary,
	clearLibrarySearch,
} from '../../flux/actions/libraryActions';
import LibraryItemForm from './LibraryItemForm';

const LibrarySearch = ({
	librarySearch,
	searchLibrary,
	clearLibrarySearch,
}) => {
	const [search, setSearch] = useState('');
	const [newItemData, setNewItemData] = useState('');

	const handleOnChange = (e) => {
		setSearch(e.target.value);
		if (e.target.value !== '') {
			searchLibrary(e.target.value);
			console.log('searching...');
		} else {
			clearLibrarySearch();
			console.log('search cleared');
		}

		setNewItemData(e.target.value);
	};

	return (
		<Form
			onSubmit={(e) => e.preventDefault()}
			autoComplete='off'
			className='add-library-item-form search-bar'>
			<FormGroup>
				<Input
					type='text'
					name='search'
					id='item'
					placeholder='Enter Item Name or UPC...'
					onChange={(e) => handleOnChange(e)}
					autoFocus></Input>
				{search !== '' && (
					<div className='new-item-triggers'>
						<LibraryItemForm
							triggerName='New UPC Item'
							newItemData={{ upcs: [newItemData] }}
						/>
						<LibraryItemForm
							triggerName='New Name Item'
							newItemData={{ name: newItemData, upcs: [''] }}
						/>
					</div>
				)}
			</FormGroup>
		</Form>
	);
};

const mapStateToProps = (state) => ({
	librarySearch: state.library.librarySearch,
});

export default connect(mapStateToProps, { searchLibrary, clearLibrarySearch })(
	LibrarySearch
);
