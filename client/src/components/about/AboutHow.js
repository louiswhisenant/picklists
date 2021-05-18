import React from 'react';
import { Button, Container } from 'reactstrap';

const AboutHow = () => {
	return (
		<section id='about-how' className='about-section'>
			<Container>
				<div className='about-card'>
					<h2 className='about-title about-how-title'>
						How does it work?
					</h2>
					<p className='about-desc about-how-desc'>
						Picklists is designed to be flexible and used in a
						number of team configurations, but let's follow one
						example of how it can be used from start to finish.
					</p>
					<Button
						href='#about-steps'
						className='about-how-learn-more'>
						Show Me
					</Button>
				</div>
			</Container>
		</section>
	);
};

export default AboutHow;
