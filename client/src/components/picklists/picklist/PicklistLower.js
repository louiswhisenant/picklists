import React from 'react';
import { CardBody } from 'reactstrap';

const PicklistLower = ({ picklist }) => {
	return (
		<CardBody className='bg-2 text-dark picklist-lower p-0'>
			<ul>
				{picklist.items.length > 0 ? (
					picklist.items.map((item) => (
						<li key={item._id}>
							{item.resolved === 'requested' ? (
								<i className='fas fa-search c-requested'></i>
							) : item.resolved === 'retrieved' ? (
								<i className='fas fa-check c-found'></i>
							) : (
								<i className='fas fa-ban c-not-found'></i>
							)}
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
						<p className='m-3'>
							<strong>{picklist.author_name}</strong> has not
							added any items to this list yet.
						</p>
					</li>
				)}
			</ul>
		</CardBody>
	);
};

export default PicklistLower;
