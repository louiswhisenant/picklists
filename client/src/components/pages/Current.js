import React, { Fragment, useEffect } from 'react';
import { Container } from 'reactstrap';
import AddPicklistItem from '../current/AddPicklistItem';
import CurrentItems from '../current/CurrentItems';
import SubmitCurrent from '../current/SubmitCurrent';
import { connect } from 'react-redux';
import { getCurrentPicklist } from '../../flux/actions/picklistActions';
import { SkeletonCurrent } from '../skeleton/Skeleton';
import BottomNav from '../layout/BottomNav';

const Current = ({
	user,
	authLoading,
	picklists,
	picklistLoading,
	currentPicklist,
	getCurrentPicklist,
}) => {
	useEffect(() => {
		if (user && !authLoading && picklists && !picklistLoading) {
			getCurrentPicklist(user._id, 'initialized');
		}
		// eslint-disable-next-line
	}, [picklists]);

	return (
		<Fragment>
			{currentPicklist ? (
				<Container className='current page-wrapper'>
					<AddPicklistItem />
					<h1 className='text-center picklist-title'>
						{currentPicklist.list_name}
					</h1>
					<CurrentItems />
					<SubmitCurrent />
				</Container>
			) : (
				<Fragment>
					<SkeletonCurrent />
					<BottomNav />
				</Fragment>
			)}
			<BottomNav active='current' />
		</Fragment>
	);
};
const mapStateToProps = (state) => ({
	user: state.auth.user,
	authLoading: state.auth.authLoading,
	picklists: state.picklist.picklists,
	picklistLoading: state.picklist.picklistLoading,
	currentPicklist: state.picklist.currentPicklist,
});

export default connect(mapStateToProps, { getCurrentPicklist })(Current);
