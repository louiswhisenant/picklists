import React, { useRef, useLayoutEffect, useState } from 'react';
import AboutSplash from '../about/AboutSplash';
import AboutIntro from '../about/AboutIntro';
import AboutHow from '../about/AboutHow';
import AboutSteps from '../about/AboutSteps';
import { Button } from 'reactstrap';

export const About = () => {
	const introRef = useRef(null),
		line1Ref = useRef(null),
		howRef = useRef(null),
		line2Ref = useRef(null);

	const [show, setShow] = useState({
		aboutIntro: false,
		line1: false,
		aboutHow: false,
		line2: false,
	});

	useLayoutEffect(() => {
		const topPos = (element) => element.getBoundingClientRect().top;

		const introPos = topPos(introRef.current),
			line1Pos = topPos(line1Ref.current),
			howPos = topPos(howRef.current),
			line2Pos = topPos(line2Ref.current);

		const onScroll = () => {
			const scrollPos = window.scrollY + window.innerHeight;

			if (introPos < scrollPos) {
				setShow((state) => ({ ...state, aboutIntro: true }));
			}

			if (line1Pos < scrollPos) {
				setShow((state) => ({ ...state, line1: true }));
			}

			if (howPos < scrollPos) {
				setShow((state) => ({ ...state, aboutHow: true }));
			}

			if (line2Pos < scrollPos) {
				setShow((state) => ({ ...state, line2: true }));
			}
		};

		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<div id='about'>
			<AboutSplash />

			<div
				className={`scroll-content ${
					show.aboutIntro ? 'fade-in-bottom' : ''
				}`}
				ref={introRef}>
				<AboutIntro />
			</div>

			<div className='line-wrapper'>
				<div
					className={`scroll-content line ${
						show.line1 ? 'grow-from-top' : ''
					}`}
					ref={line1Ref}></div>
			</div>

			<div
				className={`scroll-content ${
					show.aboutHow ? 'fade-in-left' : ''
				}`}
				ref={howRef}>
				<AboutHow />
			</div>

			<div className='line-wrapper'>
				<div
					className={`scroll-content line ${
						show.line2 ? 'grow-from-top' : ''
					}`}
					ref={line2Ref}></div>
			</div>

			<div>
				<AboutSteps />
			</div>

			{/* <div>
				<h2>What makes Picklists different?</h2>
				<p>
					Picklists is different from common conventional
					replenishment strategies for the following reasons:
				</p>
			</div> */}

			<div className='container about'>
				{/* <h1 className='display-4'>About Picklists</h1>
				<p>
					Picklists is a fullstack MERN application designed for
					assisting the user in quickly creating organized lists of
					shelf-outs that can be persisted to authorized users for
					retrieval from storage.
				</p>
				<br />
				<p>
					The goal of Picklists is to increase work efficiency by
					targeting problem areas with specificity; with Picklists,
					the user retrieves only what is needed from storage, and
					should therefore return from the shelf with little to no
					stock left over, when the app is used as intended.
				</p>
				<br />
				<p>
					Picklists, in conjunction with an organized backstock area,
					will yield fast shelf recovery and low shrink, as well as a
					more evenly distributed workload across teams, and a
					prioritization of 'precovery' over recovery.
				</p> */}
				<br />
				<br />
				<p>
					Author:{' '}
					<Button href='https://www.louiswhisenant.com'>
						Louis Whisenant
					</Button>
				</p>
				<p>
					View Source:{' '}
					<Button href='https://github.com/louiswhisenant/picklists'>
						Github
					</Button>
				</p>
				<br />
				<p>
					<strong>Version:</strong> 1.0.0
				</p>
				<h4 className='attributions'>Attributions</h4>
				<p>
					Icons:{' '}
					<Button href='https://fontawesome.com/'>
						Font Awesome
					</Button>
				</p>
				<p>
					Loading Spinner:{' '}
					<Button href='https://loading.io/css/'>loading.io</Button>
				</p>
			</div>
		</div>
	);
};
