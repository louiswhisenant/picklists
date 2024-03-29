import React from 'react';

export const RingTimer = () => {
	return (
		<div className='refresh-ring'>
			<div></div>
		</div>
	);
};

export const BarTimer = () => {
	return (
		<div className='refresh-bar'>
			<div className='bar-filler active'></div>
		</div>
	);
};

export const PauseBarTimer = () => {
	return (
		<div className='refresh-bar'>
			<div className='bar-filler inactive'></div>
		</div>
	);
};
