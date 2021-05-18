import React from 'react';
import { Container } from 'reactstrap';

const AboutIntro = () => {
	return (
		<section id='about-intro' className='about-section'>
			<Container>
				<div className='about-card about-intro-card'>
					<h2 className='about-title about-intro-title'>
						What is Picklists?
					</h2>
					<p className='about-desc about-intro-desc'>
						Picklists is an app that allows users to{' '}
						<span>quickly map and execute strategies</span> for both
						the <span>recovery of shelf-outs</span> through
						selective replenishment, as well as the{' '}
						<span>prevention of near-outs</span> through pre-emptive
						replenishment.
					</p>

					<div className='about-intro-perks'>
						<div className='about-sub-card'>
							<i className='fas fa-stopwatch'></i>
							<h5 className='about-sub-card-title'>Fast</h5>
							<hr />
							<p>
								Respond to needed areas on the salesfloor faster
								and recover the department in record time.
							</p>
						</div>
						<div className='about-sub-card'>
							<i className='fas fa-search'></i>
							<h5 className='about-sub-card-title'>Precise</h5>
							<hr />
							<p>
								Only retrieve exactly what you need to bring the
								merchandised areas back to presentation
								standards.
							</p>
						</div>
						<div className='about-sub-card'>
							<i className='fas fa-dollar-sign'></i>
							<h5 className='about-sub-card-title'>
								Cost-Efficient
							</h5>
							<hr />
							<p>
								Maintain effective stock rotation and reduce
								waste and out-of-date product. Eliminate
								stocking redundancies by channelling in-house
								shopping services to an organized backstock
								area.
							</p>
						</div>
						<div className='about-sub-card'>
							<i className='fas fa-traffic-light'></i>
							<h5 className='about-sub-card-title'>
								Reduces Congestion
							</h5>
							<hr />
							<p>
								Lower the footprint of company equipment on the
								salesfloor caused by in-house shoppers and
								restocking teams using more cumbersome
								conventional recovery methods.
							</p>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default AboutIntro;
