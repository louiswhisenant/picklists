import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import BottomNav from '../layout/BottomNav';
import LibrarySearch from '../library/LibrarySearch';
import { loadUser } from '../../flux/actions/authActions';
import { getLibrary } from '../../flux/actions/libraryActions';
import LibraryItems from '../library/LibraryItems';
import { Spinner } from '../loading/Loading';
import { getCurrentPicklist } from '../../flux/actions/picklistActions';

const Library = ({
	libraryLoading,
	user,
	authLoading,
	loadUser,
	getLibrary,
	getCurrentPicklist,
}) => {
	// Load Library
	useEffect(() => {
		getLibrary();
		getCurrentPicklist();
		// eslint-ignore-next-line
	}, [getLibrary, getCurrentPicklist]);

	const loading = (
		<Fragment>
			<Spinner />
		</Fragment>
	);

	return (
		<Fragment>
			<Container className='page-wrapper library'>
				{user && !authLoading && !libraryLoading ? (
					<Fragment>
						<LibrarySearch />
						<LibraryItems />
					</Fragment>
				) : (
					loading
				)}
			</Container>
			<BottomNav active='library' />
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	libraryItems: state.library.libraryItems,
	libraryLoading: state.library.libraryLoading,
	user: state.auth.user,
	authLoading: state.auth.authLoading,
});

export default connect(mapStateToProps, {
	getLibrary,
	loadUser,
	getCurrentPicklist,
})(Library);
