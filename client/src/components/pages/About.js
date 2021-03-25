import React from 'react';

export const About = () => {
	return (
		<div className='container about'>
			<h1 className='display-4'>About Picklists</h1>
			<p>
				Picklists is a fullstack MERN application designed for assisting
				the user in quickly creating organized lists of shelf-outs that
				can be persisted to authorized users for retrieval from storage.
			</p>
			<br />
			<p>
				The goal of Picklists is to increase work efficiency by
				targeting problem areas with specificity; with Picklists, the
				user retrieves only what is needed from storage, and should
				therefore return from the shelf with little to no stock left
				over, when the app is used as intended.
			</p>
			<br />
			<p>
				Picklists, in conjunction with an organized backstock area, will
				yield fast shelf recovery and low shrink, as well as a more
				evenly distributed workload across teams, and a prioritization
				of 'precovery' over recovery.
			</p>
			<br />
			<br />
			<p>
				Author:{' '}
				<a href='https://www.louiswhisenant.com'>Louis Whisenant</a>
			</p>
			<p>
				View Source:{' '}
				<a href='https://github.com/louiswhisenant/picklists'>Github</a>
			</p>
			<br />
			<p>
				<strong>Version:</strong> 1.0.0
			</p>
			<h4 className='attributions'>Attributions</h4>
			<p>
				Icons: <a href='https://fontawesome.com/'>Font Awesome</a>
			</p>
			<p>
				Loading Spinner:{' '}
				<a href='https://loading.io/css/'>loading.io</a>
			</p>
		</div>
	);
};
