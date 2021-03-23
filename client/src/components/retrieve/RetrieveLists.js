import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPicklists } from '../../flux/actions/picklistActions';
import Picklist from '../picklists/picklist/Picklist';
import { BarTimer } from '../utils/Timer';

const RetrieveLists = ({ picklists, getPicklists }) => {
	const submitted = (list) => list.status === 'submitted';

	useEffect(() => {
		const refresh = setTimeout(() => {
			getPicklists();
		}, 10000);

		return () => {
			clearTimeout(refresh);
		};
	}, [getPicklists]);

	return (
		<div className='retrieve-lists'>
			<BarTimer />
			{picklists.some(submitted) ? (
				picklists.map(
					(list) =>
						list.status === 'submitted' && (
							<Picklist key={list._id} picklist={list} />
						)
				)
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
