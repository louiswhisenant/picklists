import React, { Fragment, useState } from 'react';
import { Collapse, CardBody, Card, Button } from 'reactstrap';
import { connect } from 'react-redux';
import {
	clearCurrentPicklist,
	deletePicklist,
} from '../../flux/actions/picklistActions';
import { formatDateAndTimeCST } from '../utils/Date';

const Picklists = ({
	deletePicklist,
	clearCurrentPicklist,
	picklist,
	currentPicklist,
}) => {
	const [isOpen, setIsOpen] = useState('');

	const { picklists } = picklist;

	const handleToggle = (id) => {
		if (isOpen === id) {
			setIsOpen('');
		} else {
			setIsOpen(id);
		}
	};

	const handleDelete = (id) => {
		if (id === currentPicklist._id) {
			clearCurrentPicklist();
		}
		deletePicklist(id);
	};

	return (
		<Fragment>
			{picklists.map((picklist) => (
				<Card
					key={picklist._id}
					className='w-100 bg-1 border-1 mb-2 picklist'>
					<Collapse
						isOpen={isOpen === picklist._id}
						className='picklist-collapse-upper'>
						<CardBody>
							<div>
								<Button
									className='remove-btn bg-1'
									name='remove-btn'
									onClick={(e) => {
										e.stopPropagation();
										handleDelete(picklist._id);
									}}>
									<i className='fas fa-trash-alt'></i> Delete
								</Button>
								{picklist.status === 'submitted' ? (
									<Button
										className='retrieve-btn bg-1'
										onClick={(e) => {
											e.stopPropagation();
											console.log(
												`Retrieve Picklist ${picklist._id}`
											);
										}}>
										<i className='fas fa-cart-arrow-down'></i>{' '}
										Retrieve
									</Button>
								) : null}
							</div>
						</CardBody>
					</Collapse>

					<CardBody
						onClick={() => handleToggle(picklist._id)}
						className='picklist-header d-flex align-items-center'>
						<div className='picklist-info'>
							<h4 className='card-title'>{picklist.list_name}</h4>
							<h5 className='card-subtitle text-dark'>
								<span className='text-muted'>by </span>
								{picklist.author_name}
							</h5>
							<small>{formatDateAndTimeCST(picklist.date)}</small>
						</div>
						<div className='picklist-status ml-auto'>
							<Button>{picklist.status.toUpperCase()}</Button>
						</div>
					</CardBody>

					<Collapse
						isOpen={isOpen === picklist._id}
						className='picklist-collapse-lower'>
						<CardBody className='bg-2 text-dark picklist-body p-0'>
							<ul>
								{picklist.items.length > 0 ? (
									picklist.items.map((item) => (
										<li key={item._id}>
											{item.size && (
												<strong className='picklist-body-size'>
													{item.size}&nbsp;
												</strong>
											)}
											<span className='picklist-body-id'>
												{item.name}
											</span>
											<span className='picklist-body-qty'>
												{item.qty}
											</span>
										</li>
									))
								) : (
									<li>
										<p className='m-0'>
											<strong>
												{picklist.author_name}
											</strong>{' '}
											has not added any items to this list
											yet.
										</p>
									</li>
								)}
							</ul>
						</CardBody>
					</Collapse>
				</Card>
			))}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	picklist: state.picklist,
	user: state.auth.user,
	currentPicklist: state.picklist.currentPicklist,
});

export default connect(mapStateToProps, {
	deletePicklist,
	clearCurrentPicklist,
})(Picklists);
