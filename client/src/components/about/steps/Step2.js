import React from 'react';

const StepTwo = () => {
	return (
		<div id='step-2'>
			<h4 className='step-title'>Step 2. Request Picklists.</h4>
			<p>
				Scouts generate and submit picklists for each section by
				scanning shelf lows and outs.
			</p>

			<div className='step-2-grid'>
				<div className='v-line stem'></div>
				<div className='h-line'></div>

				<div className='v-line v-1'></div>
				<div className='v-line v-2'></div>
				<div className='v-line v-3'></div>

				<div className='scout scout-1'>
					<div className='device'>
						<i className='fas fa-mobile'></i>
					</div>
					<div className='personnel'>
						<i className='fas fa-user'></i>
					</div>
				</div>

				<div className='scout scout-2'>
					<div className='device'>
						<i className='fas fa-mobile'></i>
					</div>
					<div className='personnel'>
						<i className='fas fa-user'></i>
					</div>
				</div>

				<div className='scout scout-3'>
					<div className='device'>
						<i className='fas fa-mobile'></i>
					</div>
					<div className='personnel'>
						<i className='fas fa-user'></i>
					</div>
				</div>

				<div className='v-line v-4'></div>
				<div className='v-line v-5'></div>
				<div className='v-line v-6'></div>

				<div className='list list-1'>
					<i className='fas fa-clipboard'></i>
				</div>

				<div className='list list-2'>
					<i className='fas fa-clipboard'></i>
				</div>

				<div className='list list-3'>
					<i className='fas fa-clipboard'></i>
				</div>
			</div>
		</div>
	);
};

export default StepTwo;
