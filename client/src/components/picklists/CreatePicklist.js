import React, { Fragment, useState } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	getPicklists,
	addPicklist,
	getCurrentPicklist,
} from '../../flux/actions/picklistActions';
import { formatTimeCST } from '../utils/Date';
import { logout } from '../../flux/actions/authActions';

const CreatePicklist = ({
	user,
	picklists,
	currentPicklist,
	getPicklists,
	addPicklist,
	getCurrentPicklist,
	logout,
}) => {
	let history = useHistory();

	const [modal, setModal] = useState(false);
	const [picklistName, setPicklistName] = useState('');

	const handleToggle = () => setModal(!modal);

	const handleChange = (e) => {
		setPicklistName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!user) {
			logout();
		} else if (currentPicklist && currentPicklist.length > 0) {
			console.log(
				`${user.name} already has a picklist initialized. Finish and submit the current picklist or delete it to start a new one.`
			);
		} else {
			setPicklistName(`${user.name} ${formatTimeCST(Date.now())}`);
			const newPicklist = {
				list_name: picklistName,
			};

			addPicklist(newPicklist);

			handleToggle();
			history.push('/current');
		}
	};

	return (
		<Fragment>
			{/* Modal Trigger */}
			<Button
				onClick={() => {
					handleToggle();
					setPicklistName(
						`${user.name} ${formatTimeCST(Date.now())}`
					);
				}}>
				<i className='fas fa-clipboard-check i-super-anchor'>
					<i className='fas fa-plus i-super i-super-live'></i>
				</i>
				<span className='link-page-name'>Create</span>
			</Button>

			{/* Modal */}
			<Modal isOpen={modal} toggle={handleToggle}>
				<ModalHeader toggle={handleToggle} className='bg-1'>
					Create New Picklist
				</ModalHeader>
				<ModalBody className='bg-dark'>
					<Form onSubmit={handleSubmit}>
						<FormGroup>
							<Label for='picklist-name-input'>
								Please enter a name for the list
							</Label>
							<Input
								type='text'
								name='picklistName'
								id='picklist-name-input'
								placeholder={picklistName}
								onChange={handleChange}
							/>
						</FormGroup>
					</Form>

					<div className='d-flex'>
						<Button
							onClick={handleSubmit}
							className='ml-auto mr-3 btn btn-lg bg-1'>
							Create
						</Button>{' '}
						<Button
							color='secondary'
							onClick={handleToggle}
							className='btn btn-lg'>
							Cancel
						</Button>
					</div>
				</ModalBody>
			</Modal>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	picklists: state.picklist.picklists,
	currentPicklist: state.picklist.currentPicklist,
});

export default connect(mapStateToProps, {
	getPicklists,
	addPicklist,
	getCurrentPicklist,
	logout,
})(CreatePicklist);
