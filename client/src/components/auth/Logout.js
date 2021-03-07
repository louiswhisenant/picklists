import React, { Fragment, useState } from 'react';
import { Button, Form, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../flux/actions/authActions';

const Logout = ({ logout }) => {
	const [modal, setModal] = useState(false);

	const handleToggle = () => setModal(!modal);

	const handleLogout = (e) => {
		e.preventDefault();

		logout();
		window.location.reload();
	};

	return (
		<Fragment>
			<Button onClick={handleToggle}>
				<i className='fas fa-sign-out-alt'></i> <span>Logout</span>
			</Button>

			<Modal isOpen={modal} toggle={handleToggle}>
				<ModalHeader toggle={handleToggle} className='bg-1'>
					Log Out
				</ModalHeader>
				<ModalBody className='bg-dark'>
					<div className='text-center mb-3'>
						Are you sure you want to log out?
					</div>
					<div className='d-flex justify-content-center'>
						<Form onSubmit={handleLogout}>
							<Button
								type='submit'
								className='m-2 btn btn-lg bg-1'>
								Logout
							</Button>{' '}
							<Button
								color='secondary'
								onClick={handleToggle}
								className='m-2 btn btn-lg'>
								Cancel
							</Button>
						</Form>
					</div>
				</ModalBody>
			</Modal>
		</Fragment>
	);
};

export default connect(null, { logout })(Logout);
