import React, { useEffect, useState } from 'react';
import store from '../../flux/store';
import { connect } from 'react-redux';
import { watch } from 'redux-watch';
import { getPicklists } from '../../flux/actions/picklistActions';
import Picklist from '../picklists/picklist/Picklist';
import ForceRefresh from '../utils/ForceRefresh';
import { BarTimer, PauseBarTimer } from '../utils/Timer';

import { useHistory } from 'react-router-dom';
import useSound from 'use-sound';
import notification from '../../assets/sound/ding.mp3';

const RetrieveLists = ({ picklists, getPicklists }) => {
	let history = useHistory();
	const submitted = (list) => list.status === 'submitted';
	const [pauseRefresh, setPauseRefresh] = useState(false);
	const [playNotification, setPlayNotification] = useState(false);
	const [play] = useSound(notification, { interrupt: false });
	const submittedLists = picklists.filter(
		(list) => list.status === 'submitted'
	);

	// Check for open collapse lists in order to pause refresh timer
	useEffect(() => {
		const checkForOpen = () => {
			const picklistOpen = document.querySelector('.picklist-open');

			picklistOpen ? setPauseRefresh(true) : setPauseRefresh(false);
		};

		document.addEventListener('click', checkForOpen);

		return () => {
			document.removeEventListener('click', checkForOpen);
		};
	}, [setPauseRefresh]);

	// Refresh timer countdown
	useEffect(() => {
		const refresh = setTimeout(() => {
			if (!pauseRefresh) {
				getPicklists();
			}
		}, 10000);

		return () => {
			clearTimeout(refresh);
		};
	}, [getPicklists, pauseRefresh]);

	// Check for new lists to play notification sound
	useEffect(() => {
		const submittedIDs = submittedLists.map((list) => list._id);
		// get submitted in LS
		const oldLists = localStorage.getItem('submitted');

		// create submitted in LS if it does not exist
		if (!oldLists) {
			localStorage.setItem('submitted', JSON.stringify(submittedIDs));
			console.log('LS init');
			// if it does exist, compare it to latest render
		} else {
			console.log('LS exists');
			console.log('[oldLists]', oldLists);
			// if newLists contain ids not found in oldLists, play notification and update oldLists
			const newLists = submittedIDs.filter(
				(ID) => !oldLists.includes(ID)
			);
			console.log('[newLists]', newLists);
			if (newLists.length > 0) {
				setPlayNotification(true);
				localStorage.setItem('submitted', JSON.stringify(submittedIDs));
				console.log('submitted updated');
			}
		}
		// eslint-disable-next-line
	}, [submittedLists]);

	useEffect(() => {
		if (playNotification) {
			play();
		}
	}, [playNotification, play]);

	return (
		<div className='retrieve-lists'>
			<ForceRefresh />
			{pauseRefresh ? <PauseBarTimer /> : <BarTimer />}
			{picklists.some(submitted) ? (
				submittedLists.map((list) => (
					<Picklist key={list._id} picklist={list} />
				))
			) : (
				<h3 className='no-retrieve-lists-msg'>
					There are no picklists ready to retrieve. To create or
					submit one, go to the create/current tab. To see all
					picklists, go to the picklists tab. Click{' '}
					<a
						href='#!'
						onClick={() => getPicklists()}
						className='bg-4'>
						here
					</a>{' '}
					to refresh the current page.
				</h3>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	picklists: state.picklist.picklists,
});

export default connect(mapStateToProps, { getPicklists })(RetrieveLists);
