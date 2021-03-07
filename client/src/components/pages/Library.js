import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import BottomNav from '../layout/BottomNav';
import LibrarySearch from '../library/LibrarySearch';
import { loadUser } from '../../flux/actions/authActions';
import { getLibrary } from '../../flux/actions/libraryActions';
import LibraryItems from '../library/LibraryItems';
import { SkeletonCurrent } from '../skeleton/Skeleton';

const Library = ({
	libraryLoading,
	user,
	authLoading,
	loadUser,
	getLibrary,
}) => {
	// Load User
	useEffect(() => {
		loadUser();
	}, [loadUser]);

	// Load Library
	useEffect(() => {
		if (user) {
			getLibrary();
		}
	}, [user, getLibrary]);

	const loading = (
		<Fragment>
			<SkeletonCurrent />
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

				{/* LibrarySearch
				    LibraryItems
                        LibraryItem
                    NewLibraryItem
                */}
			</Container>
			<BottomNav />
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	libraryItems: state.library.libraryItems,
	libraryLoading: state.library.libraryLoading,
	user: state.auth.user,
	authLoading: state.auth.authLoading,
});

export default connect(mapStateToProps, { getLibrary, loadUser })(Library);
