import React, { Fragment } from 'react';
import { Spinner } from '../loading/Loading';
import Timer from '../utils/Timer';

const Testing = () => {
	const loading = (
		<Fragment>
			<Timer />
			<Spinner />
		</Fragment>
	);

	return <Fragment>{loading}</Fragment>;
};

export default Testing;
