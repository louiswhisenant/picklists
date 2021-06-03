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
	ModalFooter,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
	addLibraryItem,
	updateLibraryItem,
	clearLibrarySearch,
	getLibrary,
} from '../../flux/actions/libraryActions';
import AlertHandler from '../layout/AlertHandler';
import { returnErrors } from '../../flux/actions/errorActions';
import { CirclePicker } from 'react-color';

const LibraryItemForm = ({
	addLibraryItem,
	updateLibraryItem,
	clearLibrarySearch,
	getLibrary,
	triggerName,
	newItemData,
	returnErrors,
}) => {
	const [item, setItem] = useState({
		name: '',
		size: '',
		desc: '',
		upcs: [],
		color: '',
	});

	const [modal, setModal] = useState(false);

	const handleToggle = () => setModal(!modal);

	const handleOnChange = (e) => {
		setItem({ ...item, [e.target.name]: e.target.value });
	};

	const handleColor = (color) => {
		setItem({ ...item, color: color.hex });
	};

	const handleUpcChange = (e, i) => {
		const updatedUpcs = item.upcs;
		updatedUpcs[i] = e.target.value;
		setItem({
			...item,
			upcs: updatedUpcs,
		});
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();

		const newData = item;
		newData.upcs = newData.upcs.filter((upc) => upc !== '');

		if (
			!newData.name ||
			newData.name === '' ||
			!newData.upcs ||
			newData.upcs === []
		) {
			returnErrors(
				'Item must have a name and at least one UPC',
				'danger',
				null
			);
		} else {
			// If there is no _id, the item is new
			if (!newData._id) {
				// Add the new item
				addLibraryItem(newData);

				// If there is _id, the item is being edited
			} else {
				// Update item
				updateLibraryItem(newData);
			}

			// Clear Current to reset edit state and forms
			clearLibrarySearch();
			getLibrary();
			handleToggle();
		}
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
			<Button
				onClick={() => {
					handleToggle();
					setItem(newItemData);
					clearLibrarySearch();
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

			<Modal
				isOpen={modal}
				toggle={handleToggle}
				className='library-item-modal'>
				<ModalHeader toggle={handleToggle} className='bg-1'>
					{triggerName === 'Edit Item' ? 'Edit Item' : 'New Item'}
				</ModalHeader>

				<ModalBody className='bg-1 pb-5'>
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
								for='item-color-input'
								className='library-item-label'>
								Color
							</Label>
							<CirclePicker
								color={item.color}
								onChangeComplete={handleColor}
								triangle='hide'
								width='100%'
								colors={[
									'#c00000',
									'#e98400',
									'#ecdd00',
									'#00bb1f',
									'#027716',
									'#001ec7',
									'#0e0183',
									'#2c0270',
									'#e90090',
									'#fc61b6',
									'#008f83',
									'#0092d6',
									'#000000',
									'#ffffff',
									'#555555',
								]}
								className='circle-picker'
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
											}>
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
					<div className='modal-alert-anchor'>
						<AlertHandler />
					</div>
				</ModalBody>

				<ModalFooter className='bg-1'>
					<Button
						onClick={handleOnSubmit}
						className='ml-auto mr-3 btn-lg'>
						{triggerName === 'Edit Item'
							? 'Save Changes'
							: 'Create Item'}
					</Button>{' '}
					<Button onClick={handleToggle} className='btn-lg'>
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
	clearLibrarySearch,
	getLibrary,
	returnErrors,
})(LibraryItemForm);
