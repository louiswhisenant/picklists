import React from 'react';
import { Button, Container } from 'reactstrap';

const AboutSplash = () => {
	return (
		<section id='about-splash'>
			<h1 className='about-splash-title'>
				<span>Picklists</span>
			</h1>
			<h4 className='about-splash-byline'>
				Realize more precise and efficient high-velocity product (
				<span>pre</span>)recovery.
			</h4>
			<Button href='#about-intro' className='about-splash-learn-more'>
				Learn More
			</Button>
		</section>
	);
};

export default AboutSplash;
