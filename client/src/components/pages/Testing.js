import React, { Fragment } from 'react';
import { SkeletonCurrent } from '../skeleton/Skeleton';

const Testing = () => {
	const loading = (
		<Fragment>
			<SkeletonCurrent />
		</Fragment>
	);

	return <Fragment>{loading}</Fragment>;
};

export default Testing;
