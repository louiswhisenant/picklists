import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
	isAuthenticated,
	isLoading,
	component: Component,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated && !isLoading ? (
					<Redirect to='/login' />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, null)(PrivateRoute);
