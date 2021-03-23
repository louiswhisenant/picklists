import React, { Fragment } from 'react';
import { BarTimer, RingTimer } from '../utils/Timer';
import useSound from 'use-sound';
import ding from '../../assets/sound/ding.mp3';
import { Button } from 'reactstrap';

const Testing = () => {
	const [play] = useSound(ding);

	const loading = (
		<Fragment>
			<RingTimer />
			<BarTimer />
			<Button onClick={play}>Ding</Button>
			{/* <Spinner /> */}
		</Fragment>
	);

	return <Fragment>{loading}</Fragment>;
};

export default Testing;
