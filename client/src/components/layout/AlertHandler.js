import React, { useEffect } from 'react';
import { Alert, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { clearErrors } from '../../flux/actions/errorActions';

const AlertHandler = ({ error, clearErrors }) => {
	useEffect(() => {
		// Write timeout to make alert disappear
		if (error.msg) {
			setTimeout(clearErrors, 3000);
		}
	}, [error, clearErrors]);

	return error.msg ? (
		<Alert
			className={`d-flex align-items-center justify-content-center alert-${error.status}`}>
			<div className='alert-message'>{error.msg}</div>
			<Button onClick={clearErrors} className='clear-alert-btn'>
				x
			</Button>
		</Alert>
	) : null;
};

const mapStateToProps = (state) => ({
	error: state.error,
});

export default connect(mapStateToProps, { clearErrors })(AlertHandler);
