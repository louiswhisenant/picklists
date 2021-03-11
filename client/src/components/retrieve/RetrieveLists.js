import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getPicklists } from '../../flux/actions/picklistActions';
import Picklist from '../picklists/Picklist';

const RetrieveLists = ({ picklists, getPicklists }) => {
	const submitted = (list) => list.status === 'submitted';

	return (
		<Fragment>
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
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	picklists: state.picklist.picklists,
});

export default connect(mapStateToProps, { getPicklists })(RetrieveLists);
