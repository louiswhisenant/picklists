import React from 'react';

export const About = () => {
	return (
		<div className='container'>
			<h1 className='display-4'>About Picklists</h1>
			<p>
				Picklists is a fullstack MERN application designed for assisting
				the user in quickly creating organized lists of shelf-outs that
				can be persisted to authorized users for retrieval from storage.
			</p>
			<br />
			<p>
				The goal of Picklists is to increase increase work efficiency by
				targeting specificity; with Picklists, the user retrieves only
				what is needed from storage, and should therefore return from
				the shelf with little to no stock left over, when the app is
				used as intended.
			</p>
			<br />
			<br />
			<p>
				Author:{' '}
				<a href='https://www.louiswhisenant.com'>Louis Whisenant</a>
			</p>
			<br />
			<p>
				<strong>Version:</strong> 1.0.0
			</p>
			<p>
				Icons attribution:{' '}
				<a href='https://fontawesome.com/'>Font Awesome</a>
			</p>
		</div>
	);
};
