import React, { Fragment, useState, useEffect } from 'react';
import Picklist from '../picklists/picklist/Picklist';
import { connect } from 'react-redux';
import {
	getPicklists,
	getCurrentPicklist,
	deletePicklist,
} from '../../flux/actions/picklistActions';
import { loadUser } from '../../flux/actions/authActions';
import { SkeletonCard } from '../skeleton/Skeleton';
import BottomNav from '../layout/BottomNav';
import { Container, Button, InputGroup } from 'reactstrap';

const Home = ({
	picklistLoading,
	user,
	picklists,
	authLoading,
	getPicklists,
	getCurrentPicklist,
	loadUser,
}) => {
	const [statusFilter, setStatusFilter] = useState({ value: '' });

	const handleStatusFilter = (e) => {
		setStatusFilter({ value: e.target.value });
	};

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
			getCurrentPicklist(user._id, 'initialized');
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
						<div className='status-filter-hud search-bar'>
							<InputGroup>
								<Button
									className='status-filter-clear-btn'
									value=''
									onClick={(e) => handleStatusFilter(e)}>
									<i className='fas fa-ban'></i>
								</Button>
								<select
									className='form-control status-filter-select'
									value={statusFilter.value}
									onChange={(e) => handleStatusFilter(e)}>
									<option value={''}>Filter by Status</option>
									<option value='initialized'>
										Initialized
									</option>
									<option value='submitted'>Submitted</option>
									<option value='retrieving'>
										Retrieving
									</option>
									<option value='retrieved'>Retrieved</option>
									<option value='complete'>Complete</option>
								</select>
							</InputGroup>
						</div>
						{picklists.length > 0 ? (
							picklists.map((list) =>
								list.status === statusFilter.value ||
								!statusFilter.value ? (
									<Picklist key={list._id} picklist={list} />
								) : null
							)
						) : (
							<h2 className='no-picklists-msg'>
								There are no picklists to view.
							</h2>
						)}
					</Fragment>
				) : (
					loading
				)}
			</Container>
			<BottomNav active='home' />
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
