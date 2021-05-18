import React from 'react';
import { Container } from 'reactstrap';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';

const AboutSteps = () => {
	return (
		<section id='about-steps' className='about-section'>
			<Container>
				<div className='about-card'>
					<Step1 />
					<Step2 />
					<Step3 />
					<Step4 />
				</div>
			</Container>
		</section>
	);
};

export default AboutSteps;
