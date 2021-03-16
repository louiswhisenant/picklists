import React, { useState, useEffect } from 'react';
import { FormGroup, Input, Button, Form, Label } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { login } from '../../flux/actions/authActions';
import { clearErrors } from '../../flux/actions/errorActions';
import { connect } from 'react-redux';

const Login = ({ isAuthenticated, error, login, clearErrors }) => {
	let history = useHistory();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// COMBINE TO ONE FUNCTION
	const handleChangeEmail = (e) => setEmail(e.target.value);
	const handleChangePassword = (e) => setPassword(e.target.value);

	const handleOnSubmit = (e) => {
		e.preventDefault();

		const user = { email, password };

		// Attempt to login
		login(user);
	};

	useEffect(() => {
		// if authneticated, push to home
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
								handleChangeEmail(e);
							}}
						/>

						<Label for='password'>Password</Label>
						<Input
							type='password'
							name='password'
							id='password'
							placeholder='Use "password"'
							className='mb-3'
							onChange={(e) => {
								handleChangePassword(e);
							}}
						/>

						<Button
							className='btn btn-block bg-1 mt-5'
							type='submit'>
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

export default connect(mapStateToProps, { login, clearErrors })(Login);
