import React from 'react';
import { connect } from 'react-redux';
import { Container, InputGroup, InputGroupAddon, Button } from 'reactstrap';

const Settings = ({ user, updateUser }) => {
	return (
		<Container>
			<div className='settings'>
				<div>Settings page is under construction.</div>
				<div className='settings-name'>
					<InputGroup>
						<div className='settings-name-name'>{user.name}</div>
						<InputGroupAddon>
							<Button>Change</Button>
						</InputGroupAddon>
					</InputGroup>
				</div>
				<div className='settings-email'>
					<InputGroup>
						<div className='settings-email-email'>{user.email}</div>
						<InputGroupAddon>
							<Button>Change</Button>
						</InputGroupAddon>
					</InputGroup>
				</div>
				<div className='settings-password'>
					<Button>Change Password</Button>
				</div>
				<div>Select Color?</div>
				<div>
					If Admin access, grant/revoke privileges to other users.
				</div>
			</div>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, null)(Settings);
