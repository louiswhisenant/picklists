import React, { useRef, useState, useEffect } from 'react';
import { Collapse, CardBody, Card, Button } from 'reactstrap';
import { connect } from 'react-redux';
import {
	clearCurrentPicklist,
	deletePicklist,
	updatePicklist,
} from '../../flux/actions/picklistActions';
import { formatDateAndTimeCST } from '../utils/Date';
import { useHistory } from 'react-router';
import { returnErrors } from '../../flux/actions/errorActions';

const Picklists = ({
	user,
	deletePicklist,
	clearCurrentPicklist,
	updatePicklist,
	picklist,
	currentPicklist,
	retrievePicklist,
}) => {
	let history = useHistory();
	const node = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => setIsOpen(!isOpen);

	const clickListener = (e) => {
		if (node.current && node.current.contains(e.target)) {
			return;
		}

		setIsOpen(false);
	};

	useEffect(() => {
		// Attach the listeners on component mount
		document.addEventListener('click', clickListener);
		// Detach the listeners on component unmount
		return () => {
			document.removeEventListener('click', clickListener);
		};
		// eslint-disable-next-line
	}, []);

	const handleDelete = (id) => {
		if (currentPicklist && id === currentPicklist._id) {
			clearCurrentPicklist();
		}
		deletePicklist(id);
	};

	const handleRetrieve = (picklist) => {
		if (!retrievePicklist) {
			let picklistToRetrieve = picklist;

			picklistToRetrieve.retriever_id = user._id;
			picklistToRetrieve.retriever_name = user.name;
			picklist.status = 'retrieving';

			updatePicklist(picklistToRetrieve);

			history.push('/retrieve');
		} else {
			returnErrors(
				'User already has a picklist in retrieving',
				'danger',
				null
			);
		}
	};

	return (
		<Card key={picklist._id} className='w-100 bg-1 border-1 mb-2 picklist'>
			<Collapse isOpen={isOpen} className='picklist-collapse-upper'>
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
									handleRetrieve(picklist);
								}}>
								<i className='fas fa-cart-arrow-down'></i>{' '}
								Retrieve
							</Button>
						) : null}
					</div>
				</CardBody>
			</Collapse>

			<CardBody
				onClick={() => handleToggle()}
				className='picklist-header'>
				<div className='picklist-info' ref={node}>
					<h4 className='picklist-title'>{picklist.list_name}</h4>
					<h5 className='picklist-subtitle'>
						<span className='picklist-subtitle-by'>by </span>
						{picklist.author_name}
					</h5>
					<small className='picklist-date'>
						{formatDateAndTimeCST(picklist.date)}
					</small>
					<div className={`status-dot bg-${picklist.status}`}></div>
				</div>

				{isOpen && (
					<div className={`picklist-status bg-${picklist.status}`}>
						{picklist.status.toUpperCase()}
					</div>
				)}
			</CardBody>

			<Collapse isOpen={isOpen} className='picklist-collapse-lower'>
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
									<strong>{picklist.author_name}</strong> has
									not added any items to this list yet.
								</p>
							</li>
						)}
					</ul>
				</CardBody>
			</Collapse>
		</Card>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	currentPicklist: state.picklist.currentPicklist,
	retrievePicklist: state.picklist.retrievePicklist,
});

export default connect(mapStateToProps, {
	deletePicklist,
	clearCurrentPicklist,
	updatePicklist,
})(Picklists);
