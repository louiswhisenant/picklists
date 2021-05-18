import React from 'react';

const StepOne = () => {
	return (
		<div id='step-1'>
			<h4 className='step-title'>Step 1. Ready the Team.</h4>
			<p>
				Designate a team librarian to coordinate the backstock, while
				other team members scout and replenish problem areas on the
				sales floor.
			</p>

			<div className='step-1-grid'>
				<div className='v-line stem'></div>
				<div className='h-line'></div>

				<div className='v-line v-1'></div>
				<div className='v-line v-2'></div>

				<div className='team team-1'>
					<div className='device'>
						<i className='fas fa-desktop'></i>
					</div>
					<div className='personnel'>
						<i className='fas fa-user'></i>
					</div>
				</div>

				<div className='team team-2'>
					<div className='device'>
						<i className='fas fa-mobile'></i>
						<i className='fas fa-mobile'></i>
						<i className='fas fa-mobile'></i>
					</div>
					<div className='personnel'>
						<i className='fas fa-user'></i>
						<i className='fas fa-user'></i>
						<i className='fas fa-user'></i>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StepOne;
