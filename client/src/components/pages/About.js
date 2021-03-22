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
				The goal of Picklists is to increase work efficiency by
				targeting problem areas with specificity; with Picklists, the
				user retrieves only what is needed from storage, and should
				therefore return from the shelf with little to no stock left
				over, when the app is used as intended.
			</p>
			<br />
			<p>
				Picklists was made with the user's needs in mind. It is only
				meant to make the user's work easier and more efficient, not
				more proper, and it is therefore unopinionated in much of its
				functionality. The user can request multiples of a given item,
				but one scan of the correct barcode will clear the item from the
				retrieval. Features like this found in Picklists are by
				intention. The ultimate goal is to harness the ability to
				quickly strategize and react to in-store problems, without being
				bound by the stubborn rulesets of stricter applications.
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
			<h4>Attributions</h4>
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
