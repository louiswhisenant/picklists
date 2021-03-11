import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'reactstrap';
import CreatePicklist from '../picklists/CreatePicklist';

const BottomNav = ({ currentPicklist, picklists }) => {
	const newList = <CreatePicklist />;

	const editList = (
		<Link to='/current' className='new-list-btn btn btn-round '>
			<i className='fas fa-clipboard-check i-super-anchor'>
				<i className='fas fa-pen i-super i-super-live'></i>
			</i>
			<span className='link-page-name'>Current</span>
		</Link>
	);

	return (
		<Navbar className='bottom-nav navbar fixed-bottom' id='bottom-nav'>
			<Nav>
				<NavItem>
					<Link to='/'>
						<i className='fas fa-home i-super-anchor'>
							<span className='i-super i-super-live picklist-count'>
								{picklists.length < 10
									? picklists.length
									: '...'}
							</span>
						</i>
						<span className='link-page-name'>Picklists</span>
					</Link>
				</NavItem>
				<NavItem>{!currentPicklist ? newList : editList}</NavItem>
				<NavItem>
					<Link to='/retrieve'>
						<i className='fas fa-cart-arrow-down i-super-anchor'></i>
						<span className='link-page-name'>Retrieve</span>
					</Link>
				</NavItem>
				<NavItem>
					<Link to='/library'>
						<i className='fas fa-book i-super-anchor'>
							<i className='fas fa-plus i-super'></i>
						</i>
						<span className='link-page-name'>Library</span>
					</Link>
				</NavItem>
			</Nav>
		</Navbar>
	);
};

const mapStateToProps = (state) => ({
	currentPicklist: state.picklist.currentPicklist,
	picklists: state.picklist.picklists,
});

export default connect(mapStateToProps, null)(BottomNav);
