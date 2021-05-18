import React from 'react';
import { connect } from 'react-redux';
import { getPicklists } from '../../flux/actions/picklistActions';

const ForceRefresh = ({ getPicklists }) => {
	return (
		<a
			href='#!'
			onClick={() => {
				getPicklists();
			}}
			className='force-refresh'>
			<i className='fas fa-redo-alt'></i>
		</a>
	);
};

export default connect(null, { getPicklists })(ForceRefresh);
