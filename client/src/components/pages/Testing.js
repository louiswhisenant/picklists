import React, { Fragment } from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import { SkeletonCard, SkeletonCurrent } from '../skeleton/Skeleton';

// const skeletonCard = (
// 	<Card className='w-100 bg-3 border-3 mb-2 picklist-skeleton'>
// 		<CardBody className='card-body-skeleton d-flex align-items-center'>
// 			<div className='picklist-info-skeleton'>
// 				<h4 className='card-title card-title-skeleton'>&nbsp;</h4>
// 				<h5 className='card-subtitle text-dark card-subtitle-skeleton'>
// 					&nbsp;
// 				</h5>
// 				<small className='date-skeleton'>Oct 12 2021, 11:59PM</small>
// 			</div>
// 			<div className='picklist-status-skeleton ml-auto'>
// 				<Button>&nbsp;</Button>
// 			</div>
// 		</CardBody>
// 	</Card>
// );

const Testing = () => {
	const loading = (
		<Fragment>
			<SkeletonCurrent />
		</Fragment>
	);

	return <Fragment>{loading}</Fragment>;
};

export default Testing;
