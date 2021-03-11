import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import BottomNav from '../layout/BottomNav';
import GetRetrieveItem from './GetRetrieveItem';
import RetrieveItems from './RetrieveItems';
import { SkeletonCurrent } from '../skeleton/Skeleton';
import { Container } from 'reactstrap';

const RetrieveList = ({ retrievePicklist }) => {
	return (
		<Fragment>
			{retrievePicklist ? (
				<Container className='retrieve page-wrapper'>
					<div className='retrieve-picklist-header'>
						<h1 className='text-center retrieve-picklist-title'>
							{retrievePicklist.list_name}
						</h1>
					</div>
					<div>
						<GetRetrieveItem />
						<RetrieveItems />
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
	retrievePicklist: state.picklist.retrievePicklist,
});

export default connect(mapStateToProps, null)(RetrieveList);
