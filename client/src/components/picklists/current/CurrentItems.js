import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	ListGroup,
	ListGroupItem,
	Button,
	Input,
	CardBody,
	Collapse,
} from 'reactstrap';
import { updatePicklist } from '../../../flux/actions/picklistActions';

const CurrentItems = ({ currentPicklist, updatePicklist }) => {
	const [isOpen, setIsOpen] = useState('');
	const [newQty, setNewQty] = useState(0);
	const [picklist, setPicklist] = useState([]);

	const handleToggle = (id) => {
		if (isOpen === id) {
			setIsOpen('');
		} else {
			setIsOpen(id);
		}
	};

	const handleDelete = (e, id) => {
		e.preventDefault();

		let picklistToUpdate = currentPicklist;

		picklistToUpdate.items = picklistToUpdate.items.filter(
			(item) => item._id !== id
		);

		updatePicklist(picklistToUpdate);
	};

	const handleQtyChange = (e, id, qtyToChange) => {
		e.preventDefault();

		// Check for input rejections
		if (
			qtyToChange < 1 ||
			qtyToChange > 99 ||
			!Number.isInteger(qtyToChange)
		) {
			// WRITE HANDLE REJECTION TO ALERT
			console.log('Input must be a number from 1 to 99');
		} else {
			// Update picklist item quantity
			let picklistToUpdate = currentPicklist;

			picklistToUpdate.items = picklistToUpdate.items.filter((item) =>
				item._id === id ? (item.qty = qtyToChange) : item
			);
			updatePicklist(picklistToUpdate);
		}
	};

	useEffect(() => {
		setPicklist(currentPicklist);
	}, [currentPicklist]);

	return (
		<ListGroup className='current-items-list'>
			{picklist.items && picklist.items.length > 0 ? (
				picklist.items.map(({ _id, name, size, qty }) => (
					<Fragment key={_id}>
						<Collapse isOpen={isOpen === _id}>
							<CardBody className='current-items-item-options'>
								<Button
									className='remove-btn bg-1 mr-2'
									size='sm'
									name='remove-btn'
									onClick={(e) => handleDelete(e, _id)}>
									<i className='fas fa-trash-alt'></i> Delete{' '}
									{name}
								</Button>
							</CardBody>
						</Collapse>

						<ListGroupItem
							onClick={() => {
								handleToggle(_id);
								setNewQty(qty);
							}}
							className='d-flex align-items-center text-dark'>
							<div className='current-items-name'>
								{size && (
									<strong className='current-items-size'>
										{size}&nbsp;
									</strong>
								)}
								{name}
							</div>
							<div className='current-items-qty-widget d-inline-block ml-auto d-flex'>
								{qty}
							</div>
						</ListGroupItem>

						<Collapse isOpen={isOpen === _id}>
							<CardBody className='current-items-item-options'>
								<div className='qty-change-btns'>
									<Button
										className='qty-change-btn'
										size='sm'
										onClick={() => setNewQty(newQty - 1)}>
										<i className='fas fa-minus'></i>
									</Button>
									<Input
										className='qty-change-input'
										type='text'
										name='qty'
										value={newQty}
										maxLength={2}
										onChange={(e) =>
											setNewQty(Number(e.target.value))
										}></Input>
									<Button
										className='qty-change-btn'
										size='sm'
										onClick={() => setNewQty(newQty + 1)}>
										<i className='fas fa-plus'></i>
									</Button>
								</div>
								<div
									className='qty-change-submit'
									onClick={() => {
										handleToggle(_id);
									}}>
									<Button className='qty-change-cancel-btn'>
										<i className='fas fa-ban'></i>
									</Button>
									<Button
										className='qty-change-submit-btn'
										onClick={(e) => {
											handleQtyChange(e, _id, newQty);
										}}>
										<i className='fas fa-check'></i>
									</Button>
								</div>
							</CardBody>
						</Collapse>
					</Fragment>
				))
			) : (
				<div>Scan or input a UPC to begin.</div>
			)}
		</ListGroup>
	);
};

const mapStateToProps = (state) => ({
	currentPicklist: state.picklist.currentPicklist,
});

export default connect(mapStateToProps, { updatePicklist })(CurrentItems);
