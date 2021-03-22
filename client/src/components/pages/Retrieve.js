import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	getPicklists,
	getRetrievePicklist,
} from '../../flux/actions/picklistActions';
import { loadUser } from '../../flux/actions/authActions';
import { Spinner } from '../loading/Loading';
import BottomNav from '../layout/BottomNav';
import { Container } from 'reactstrap';
import RetrieveLists from '../retrieve/RetrieveLists';
import RetrieveList from '../retrieve/RetrieveList';

const Retrieve = ({
	picklistLoading,
	user,
	retrievePicklist,
	authLoading,
	getPicklists,
	getRetrievePicklist,
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

	// Load Retrieve Picklist
	useEffect(() => {
		if (user) {
			getRetrievePicklist(user._id, 'retrieving');
		}
		// eslint-disable-next-line
	}, [user, getRetrievePicklist]);

	const loading = <Spinner />;

	return (
		<Fragment>
			<Container className='page-wrapper retrieve'>
				{user && !authLoading && !picklistLoading ? (
					retrievePicklist ? (
						<RetrieveList />
					) : (
						<RetrieveLists />
					)
				) : (
					loading
				)}
			</Container>
			<BottomNav active='retrieve' />
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	retrievePicklist: state.picklist.retrievePicklist,
	picklistLoading: state.picklist.picklistLoading,
	user: state.auth.user,
	authLoading: state.auth.authLoading,
});

export default connect(mapStateToProps, {
	getPicklists,
	loadUser,
	getRetrievePicklist,
})(Retrieve);
