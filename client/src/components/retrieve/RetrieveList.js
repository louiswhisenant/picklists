import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import BottomNav from '../layout/BottomNav';
import GetRetrieveItem from './GetRetrieveItem';
import RetrieveItems from './RetrieveItems';
import { Container } from 'reactstrap';
import { Spinner } from '../loading/Loading';

const RetrieveList = ({ retrievePicklist }) => {
	return (
		<Fragment>
			{retrievePicklist ? (
				<Container className='retrieve page-wrapper'>
					<GetRetrieveItem />
					<h1 className='text-center picklist-title'>
						{retrievePicklist.list_name}
					</h1>
					<RetrieveItems />
				</Container>
			) : (
				<Fragment>
					<Spinner />
					<BottomNav />
				</Fragment>
			)}
			<BottomNav />
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	retrievePicklist: state.picklist.retrievePicklist,
});

export default connect(mapStateToProps, null)(RetrieveList);
