import React from 'react';

const Step4 = () => {
	return (
		<div id='step-4'>
			<h4 className='step-title'>Step 4. Replenish Shelves.</h4>
			<p>
				The scouts take the completed picklists carts from the backstock
				area and replenish the shopped areas.
			</p>

			<div className='step-4-grid grid gtc-9 gtc-8'>
				<div className='v-line gc-3 gr-1'></div>
				<div className='v-line gc-5 gr-1 justify-self-center'></div>
				<div className='v-line gc-7 gr-1 justify-self-end'></div>

				<div className='d-flex justify-content-center m-1 gc-2 col-span-2 gr-2 justify-self-center'>
					<div className='device'>
						<i className='fas fa-dolly-flatbed'></i>
					</div>
					<div className='personnel'>
						<i className='fas fa-user'></i>
					</div>
				</div>

				<div className='d-flex justify-content-center m-1 gc-5 gr-2 justify-self-center'>
					<div className='device'>
						<i className='fas fa-dolly-flatbed'></i>
					</div>
					<div className='personnel'>
						<i className='fas fa-user'></i>
					</div>
				</div>

				<div className='d-flex justify-content-center m-1 gc-7 col-span-2 gr-2 justify-self-center'>
					<div className='device'>
						<i className='fas fa-dolly-flatbed'></i>
					</div>
					<div className='personnel'>
						<i className='fas fa-user'></i>
					</div>
				</div>

				<div className='v-line gc-3 gr-3'></div>
				<div className='v-line gc-5 gr-3 justify-self-center'></div>
				<div className='v-line gc-7 gr-3 justify-self-end'></div>

				<div className='h-line gc-3 col-span-5 gr-4'></div>

				<div className='v-line gc-5 gr-5 justify-self-center'></div>

				<div className='d-flex-justify-content-center m-1 gc-5 gr-6 justify-self-center'>
					<i className='fas fa-store'></i>
				</div>
			</div>
		</div>
	);
};

export default Step4;
