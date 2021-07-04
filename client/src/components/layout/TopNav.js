import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Collapse, Navbar, Nav, NavItem, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';
import { connect } from 'react-redux';
import Settings from '../pages/Settings';

const TopNav = ({ auth }) => {
	const node = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleNavToggle = () => setIsOpen(!isOpen);

	const clickListener = (e) => {
		if (node.current && node.current.contains(e.target)) {
			return;
		}

		setIsOpen(false);
	};

	useEffect(() => {
		// Attach the listeners on component mount
		document.addEventListener('click', clickListener);
		// Detach the listeners on component unmount
		return () => {
			document.removeEventListener('click', clickListener);
		};
		// eslint-disable-next-line
	}, []);

	const authLinks = (
		<Fragment>
			<NavItem className='top-nav-settings'>
				<Link to='/settings' onClick={() => setIsOpen(false)}>
					<Button>
						<i className='fas fa-cog'></i> <span>Settings</span>
					</Button>
				</Link>
			</NavItem>
			<NavItem className='top-nav-testing'>
				<Link to='/testing' onClick={() => setIsOpen(false)}>
					<Button>
						<i className='fas fa-vial'></i> <span>Testing</span>
					</Button>
				</Link>
			</NavItem>
			<NavItem className='top-nav-about'>
				<Link to='/about' onClick={() => setIsOpen(false)}>
					<Button>
						<i className='fas fa-info'></i> <span>About</span>
					</Button>
				</Link>
			</NavItem>
			<NavItem className='top-nav-logout'>
				<Logout />
			</NavItem>
		</Fragment>
	);

	const noAuthLinks = (
		<Fragment>
			<NavItem>
				<Link to='/about' onClick={() => setIsOpen(false)}>
					<Button>
						<i className='fas fa-info'></i> <span>About</span>
					</Button>
				</Link>
			</NavItem>
			<NavItem>
				<Link to='/login' onClick={() => setIsOpen(false)}>
					<Button>
						<i className='fas fa-sign-in-alt'></i>{' '}
						<span>Login</span>
					</Button>
				</Link>
			</NavItem>
		</Fragment>
	);

	return (
		<Fragment>
			<div ref={node} className='nav-anchor' id='top-nav'>
				<Navbar dark className='bg-1'>
					<Link
						to='/'
						onClick={() => setIsOpen(false)}
						className='navbar-brand'>
						<i className='fas fa-home'></i>
					</Link>

					{auth.isAuthenticated && auth.user ? (
						<strong className='m-auto'>{auth.user.name}</strong>
					) : null}

					<Button
						className='navbar-toggler'
						onClick={handleNavToggle}>
						<i className='fas fa-ellipsis-v'></i>
					</Button>
				</Navbar>
				<Collapse isOpen={isOpen} navbar className='width'>
					<Nav className='ml-auto' navbar>
						{auth && auth.isAuthenticated ? authLinks : noAuthLinks}
					</Nav>
				</Collapse>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, null)(TopNav);
