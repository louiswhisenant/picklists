import React, { Fragment, useEffect } from 'react';
import { Container } from 'reactstrap';
import AddPicklistItem from '../picklists/current/AddPicklistItem';
import CurrentItems from '../picklists/current/CurrentItems';
import SubmitCurrent from '../picklists/current/SubmitCurrent';
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
					<div className='current-picklist-header'>
						<h1 className='text-center current-picklist-title'>
							{currentPicklist.list_name}
						</h1>
					</div>
					<div>
						<AddPicklistItem />
						<CurrentItems />
						<SubmitCurrent />
					</div>
				</Container>
			) : (
				<Fragment>
					<SkeletonCurrent />
					<BottomNav />
				</Fragment>
			)}
			<BottomNav />
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
