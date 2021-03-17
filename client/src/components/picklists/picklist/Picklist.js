import React, { useRef, useState, useEffect } from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';
import { formatDateAndTimeCST } from '../../utils/Date';
import PicklistUpper from './PicklistUpper';
import PicklistLower from './PicklistLower';

const Picklists = ({ picklist }) => {
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

	return (
		<Card key={picklist._id} className='w-100 bg-1 border-1 mb-2 picklist'>
			<Collapse isOpen={isOpen} className='picklist-upper-collapse'>
				<PicklistUpper picklist={picklist} className='picklist-upper' />
			</Collapse>

			<CardBody
				onClick={() => handleToggle()}
				className={`picklist-header ${isOpen && 'picklist-open'}`}>
				<div className='picklist-info' ref={node}>
					<h4 className='picklist-name'>{picklist.list_name}</h4>
					<h5 className='picklist-subtitle'>
						<span className='picklist-subtitle-by'>by </span>
						{picklist.author_name}
					</h5>
					<small className='picklist-date'>
						{formatDateAndTimeCST(picklist.date)}
					</small>
					<div
						className={`status-dot bg-${picklist.status} ${
							isOpen && 'status-dot-active'
						}`}>
						<div className='picklist-status'>
							{picklist.status.toUpperCase()}
						</div>
					</div>
				</div>
			</CardBody>

			<Collapse isOpen={isOpen} className='picklist-lower-collapse'>
				<PicklistLower picklist={picklist} className='picklist-lower' />
			</Collapse>
		</Card>
	);
};

export default Picklists;
