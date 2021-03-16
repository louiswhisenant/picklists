import React, { Fragment, useState } from 'react';
import { Button, Container, Collapse } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { updatePicklist } from '../../../flux/actions/picklistActions';
import { connect } from 'react-redux';

const SubmitCurrent = ({ currentPicklist, updatePicklist }) => {
	const history = useHistory();

	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => setIsOpen(!isOpen);

	const handleSubmit = (e) => {
		e.preventDefault();

		let picklistToSubmit = currentPicklist;

		picklistToSubmit.status = 'submitted';

		updatePicklist(picklistToSubmit);

		history.push('/');
	};

	return (
		<Fragment>
			<Button
				color='primary'
				onClick={handleToggle}
				className='submit-current-trigger'>
				<i className='fas fa-clipboard-check'></i>
			</Button>
			<Collapse isOpen={isOpen} className='submit-current-collapse'>
				<Container>
					<Button
						type='submit'
						block
						size='lg'
						className='submit-current-btn'
						onClick={handleSubmit}>
						Complete Picklist
					</Button>
				</Container>
			</Collapse>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	currentPicklist: state.picklist.currentPicklist,
});

export default connect(mapStateToProps, {
	updatePicklist,
})(SubmitCurrent);
