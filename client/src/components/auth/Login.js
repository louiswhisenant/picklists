import React, { useState, useEffect } from 'react';
import { FormGroup, Input, Button, Form, Label } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { login } from '../../flux/actions/authActions';
import { connect } from 'react-redux';

const Login = ({ isAuthenticated, error, login }) => {
	let history = useHistory();

	const [user, setUser] = useState({ email: '', password: '' });

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();

		// Attempt to login
		login(user);
	};

	useEffect(() => {
		// if authenticated, push to home
		if (isAuthenticated) {
			history.push('/');
		}
	}, [error, history, isAuthenticated]);

	return (
		<div className='container login'>
			<div className='row m-auto'>
				<Form onSubmit={handleOnSubmit} className='w-100'>
					<FormGroup>
						<Label for='email'>Email</Label>
						<Input
							type='email'
							name='email'
							id='email'
							placeholder='Use "test@test.com"'
							className='mb-3'
							onChange={(e) => {
								handleChange(e);
							}}
							autoComplete='off'
						/>

						<Label for='password'>Password</Label>
						<Input
							type='password'
							name='password'
							id='password'
							placeholder='Use "password"'
							className='mb-3'
							onChange={(e) => {
								handleChange(e);
							}}
						/>

						<Button className='btn-block mt-5' type='submit'>
							Login
						</Button>
					</FormGroup>
				</Form>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
});

export default connect(mapStateToProps, { login })(Login);
