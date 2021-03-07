import React, { Fragment, useEffect } from 'react';
import Picklists from '../picklists/Picklists';
import CreatePicklist from '../picklists/CreatePicklist';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	getPicklists,
	getCurrentPicklist,
	deletePicklist,
} from '../../flux/actions/picklistActions';
import { loadUser } from '../../flux/actions/authActions';
import { SkeletonCard } from '../skeleton/Skeleton';
import BottomNav from '../layout/BottomNav';
import { Container } from 'reactstrap';

const Home = ({
	picklistLoading,
	user,
	authLoading,
	getPicklists,
	getCurrentPicklist,
	loadUser,
}) => {
	// Load User
	useEffect(() => {
		loadUser();
	}, [loadUser]);

	// Load Picklists
	useEffect(() => {
		if (user) {
			getPicklists();
		}
		// eslint-disable-next-line
	}, [user, getPicklists]);

	// Load Current Picklist
	useEffect(() => {
		if (user) {
			getCurrentPicklist(user._id);
		}
		// eslint-disable-next-line
	}, [user, getCurrentPicklist]);

	const loading = (
		<Fragment>
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
		</Fragment>
	);

	return (
		<Fragment>
			<Container className='page-wrapper home'>
				{user && !authLoading && !picklistLoading ? (
					<Fragment>
						<Picklists />
					</Fragment>
				) : (
					loading
				)}
			</Container>
			<BottomNav />
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	picklists: state.picklist.picklists,
	currentPicklist: state.picklist.currentPicklist,
	picklistLoading: state.picklist.picklistLoading,
	user: state.auth.user,
	authLoading: state.auth.authLoading,
});

export default connect(mapStateToProps, {
	getPicklists,
	loadUser,
	getCurrentPicklist,
	deletePicklist,
})(Home);
