import React, { useRef, useEffect, useState } from 'react';
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
	const search = useRef('');
	const [newItemData, setNewItemData] = useState('');

	useEffect(() => {
		if (librarySearch === []) {
			search.current.value = '';
		}
	}, [librarySearch]);

	const handleOnChange = (e) => {
		if (search.current.value !== '') {
			searchLibrary(e.target.value);
		} else {
			clearLibrarySearch();
		}

		setNewItemData(e.target.value);
	};

	return (
		<div className='library-search'>
			<Form
				onSubmit={(e) => e.preventDefault()}
				autoComplete='off'
				className='add-library-item-form'>
				<FormGroup>
					<Input
						type='text'
						name='search'
						id='item'
						ref={search}
						placeholder='Enter Item Name or UPC...'
						onChange={(e) => handleOnChange(e)}
						autoFocus></Input>

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
				</FormGroup>
			</Form>
		</div>
	);
};

const mapStateToProps = (state) => ({
	librarySearch: state.library.librarySearch,
});

export default connect(mapStateToProps, { searchLibrary, clearLibrarySearch })(
	LibrarySearch
);
