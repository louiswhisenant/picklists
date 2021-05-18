import React from 'react';

const Step3 = () => {
	return (
		<div id='step-3'>
			<h4 className='step-title'>Step 3. Retrieve Picklists.</h4>
			<p>
				The Librarian retrieves the available necessary items, referring
				to the submitted picklists. Each picklist's items are retrieved
				to its own cart.
			</p>

			<div className='step-3-grid grid gtc-9 gtr-8'>
				<div className='v-line gc-3 gr-1'></div>
				<div className='v-line gc-5 gr-1 justify-self-center'></div>
				<div className='v-line gc-7 gr-1 justify-self-end'></div>

				<div className='h-line h-line-1'></div>

				<div className='v-line v-1'></div>

				<div className='librarian librarian-1'>
					<div className='device'>
						<i className='fas fa-desktop'></i>
					</div>
					<div className='personnel'>
						<i className='fas fa-user'></i>
					</div>
				</div>

				<div className='v-line v-2'></div>

				<div className='h-line h-line-2'></div>

				<div className='v-line v-4'></div>
				<div className='v-line v-5'></div>
				<div className='v-line v-6'></div>

				<div className='list list-1'>
					<i className='fas fa-dolly-flatbed'></i>
					<i className='fas fa-clipboard-check'></i>
				</div>

				<div className='list list-2'>
					<i className='fas fa-dolly-flatbed'></i>
					<i className='fas fa-clipboard-check'></i>
				</div>

				<div className='list list-3'>
					<i className='fas fa-dolly-flatbed'></i>
					<i className='fas fa-clipboard-check'></i>
				</div>
			</div>
		</div>
	);
};

export default Step3;
