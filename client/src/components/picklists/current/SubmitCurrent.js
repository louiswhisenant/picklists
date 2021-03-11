import React, { Fragment } from 'react';
import { Button, Container, Form } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { updatePicklist } from '../../../flux/actions/picklistActions';
import { connect } from 'react-redux';

const SubmitCurrent = ({ currentPicklist, updatePicklist }) => {
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();

		let picklistToSubmit = currentPicklist;

		picklistToSubmit.status = 'submitted';

		updatePicklist(picklistToSubmit);

		history.push('/');
	};

	return (
		<Fragment>
			<Form className='fixed fixed-bottom mb-5'>
				<Container className='px-5'>
					<Button
						type='submit'
						block
						size='lg'
						className='bg-1 mb-5'
						onClick={handleSubmit}>
						Complete Picklist
					</Button>
				</Container>
			</Form>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	currentPicklist: state.picklist.currentPicklist,
});

export default connect(mapStateToProps, {
	updatePicklist,
})(SubmitCurrent);
