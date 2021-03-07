import React, { Fragment, useState, useEffect } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
	InputGroup,
	ModalFooter,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
	addLibraryItem,
	updateLibraryItem,
	setLibraryCurrent,
	clearLibraryCurrent,
} from '../../flux/actions/libraryActions';

const LibraryItemForm = ({
	currentLibraryItem,
	addLibraryItem,
	updateLibraryItem,
	setLibraryCurrent,
	clearLibraryCurrent,
	triggerName,
	newItemData,
}) => {
	const [item, setItem] = useState({
		name: '',
		size: '',
		desc: '',
		upcs: [],
	});

	const [modal, setModal] = useState(false);

	const handleToggle = () => setModal(!modal);

	const handleOnChange = (e) => {
		setItem({ ...item, [e.target.name]: e.target.value });
	};

	// Bug in the onChange means the UPC cannot be identical to another UPC, or they will become clones that will edit from the same input. Ex. if one UPC is 1234 and another is 123, and I try to add 45 to the second, both UPCs will be 12345 because 123 became 1234.
	const handleUpcChange = (e, i) => {
		const updatedUpcs = item.upcs.map((upc) =>
			item.upcs.indexOf(upc) === i ? e.target.value : upc
		);
		setItem({
			...item,
			upcs: updatedUpcs,
		});
	};

	// const handleUpcChange = (index) => (e) => {
	// 	setItem((item) => ({
	// 		...item,
	// 		upcs: item.upcs.map((upc, i) =>
	// 			index == i ? e.target.value : upc
	// 		),
	// 	}));
	// };

	const handleOnSubmit = (e) => {
		e.preventDefault();

		const newData = item;
		newData.upcs = newData.upcs.filter((upc) => upc !== '');

		// If there is no _id, the item is new
		if (!newData._id) {
			// Add the new item
			console.log(newData);
			console.log(`item added`);
			addLibraryItem(newData);

			// If there is _id, the item is being edited
		} else {
			// Update item
			console.log(newData);
			console.log(`item ${newData._id} updated`);
			updateLibraryItem(newData);
		}

		// Clear Current to reset edit state and forms
		console.log('Current cleared');
		// clearLibraryCurrent();
		handleToggle();
	};

	useEffect(() => {
		!modal &&
			setItem({
				name: '',
				size: '',
				desc: '',
				upcs: [],
			});
	}, [modal]);

	return (
		<Fragment>
			{/* Modal Trigger */}
			<Button
				className='bg-1'
				onClick={() => {
					handleToggle();
					setItem(newItemData);
				}}>
				{triggerName === 'Edit Item' ? (
					<Fragment>
						{' '}
						<i className='fas fa-pen'></i> Edit
					</Fragment>
				) : triggerName === 'New Name Item' ? (
					<Fragment>
						{' '}
						<i className='fas fa-plus'></i> New Item by Name
					</Fragment>
				) : (
					<Fragment>
						{' '}
						<i className='fas fa-plus'></i> New Item by UPC
					</Fragment>
				)}
			</Button>

			{/* Modal */}
			<Modal
				isOpen={modal}
				toggle={handleToggle}
				className='library-item-modal'>
				<ModalHeader toggle={handleToggle} className='bg-1'>
					{triggerName === 'Edit Item' ? 'Edit Item' : 'New Item'}
				</ModalHeader>

				<ModalBody className='bg-dark pb-5'>
					<Form onSubmit={handleOnSubmit}>
						<FormGroup>
							<Label
								for='item-name-input'
								className='library-item-label'>
								Item Name
							</Label>
							<Input
								type='text'
								name='name'
								id='item-name-input'
								value={item.name}
								onChange={handleOnChange}
							/>

							<Label
								for='item-size-input'
								className='library-item-label'>
								Size
							</Label>
							<Input
								type='text'
								name='size'
								id='item-size-input'
								value={item.size}
								onChange={handleOnChange}
							/>

							<Label
								for='item-desc-input'
								className='library-item-label'>
								Description
							</Label>
							<Input
								type='text'
								name='desc'
								id='item-desc-input'
								value={item.desc}
								onChange={handleOnChange}
							/>

							<Label
								for='item-upc-input-1'
								className='library-item-label'>
								UPCs
							</Label>
							{item.upcs &&
								item.upcs.map((upc, i) => (
									<FormGroup
										key={`upc${i}`}
										className='new-library-item-upc mb-3'>
										<Input
											name={`upcs[${i}]`}
											value={upc}
											onChange={(e) =>
												handleUpcChange(e, i)
											}
											className='mr-3'></Input>
										<Button
											onClick={() =>
												setItem({
													...item,
													upcs: item.upcs.filter(
														(upc) =>
															item.upcs[i] !== upc
													),
												})
											}
											className='btn bg-1'>
											<i className='fas fa-trash-alt'></i>
										</Button>
									</FormGroup>
								))}
							<Button
								onClick={() =>
									setItem({
										...item,
										upcs: [...item.upcs, ''],
									})
								}
								className='library-item-add-upc-btn'>
								<i className='fas fa-plus'></i> Add UPC
							</Button>
						</FormGroup>
					</Form>
				</ModalBody>

				<ModalFooter className='bg-dark'>
					<Button
						onClick={handleOnSubmit}
						className='ml-auto mr-3 btn btn-lg bg-1'>
						{triggerName === 'Edit Item'
							? 'Save Changes'
							: 'Create Item'}
					</Button>{' '}
					<Button
						color='secondary'
						onClick={handleToggle}
						className='btn btn-lg'>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	currentLibraryItem: state.library.currentLibraryItem,
});

export default connect(mapStateToProps, {
	addLibraryItem,
	updateLibraryItem,
	setLibraryCurrent,
	clearLibraryCurrent,
})(LibraryItemForm);
