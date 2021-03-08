import React, { Fragment, useState } from 'react';
import { Collapse, CardBody, Card, Button, Container } from 'reactstrap';
import { connect } from 'react-redux';
import LibraryItemForm from './LibraryItemForm';
import AddToCurrent from './AddToCurrent';
import { deleteLibraryItem } from '../../flux/actions/libraryActions';

const LibraryItems = ({
	currentPicklist,
	libraryItems,
	librarySearch,
	librarySearchTerm,
	deleteLibraryItem,
}) => {
	const [isOpen, setIsOpen] = useState('');

	const handleToggle = (id) => {
		if (isOpen === id) {
			setIsOpen('');
		} else {
			setIsOpen(id);
		}
	};

	const handleDelete = (id) => {
		deleteLibraryItem(id);
	};

	// Define items as librarySearch if librarySearch exists, else libraryItems
	let items;
	librarySearch.length > 0 ? (items = librarySearch) : (items = libraryItems);

	return (
		<Fragment>
			{librarySearchTerm && librarySearch.length === 0 ? (
				<Container className='mt-5 no-library-items-found'>
					<p>
						No items matched the search term. If the item doesn't
						exist, add the new item to the library with the New Item
						by UPC or New Item by Name options.
					</p>
				</Container>
			) : (
				<Fragment>
					{items.map((libraryItem) => (
						<Card
							key={libraryItem._id}
							className='w-100 bg-3 border-1 mb-2 library-item'>
							<Collapse
								isOpen={isOpen === libraryItem._id}
								className='library-item-collapse-upper'>
								<CardBody>
									{/* Fix AddToCurrent so it doesn't add duplicates */}
									{currentPicklist ===
										'a working component' && (
										<AddToCurrent itemToAdd={libraryItem} />
									)}
									<div>
										<Button
											className='remove-btn bg-1'
											name='remove-btn'
											onClick={(e) => {
												e.stopPropagation();
												handleDelete(libraryItem._id);
											}}>
											<i className='fas fa-trash-alt'></i>{' '}
											Delete
										</Button>
										<LibraryItemForm
											triggerName='Edit Item'
											newItemData={libraryItem}
										/>
									</div>
								</CardBody>
							</Collapse>

							<CardBody
								onClick={() => handleToggle(libraryItem._id)}
								className='library-item-header d-flex align-items-center'>
								<div className='library-item-info'>
									<h4 className='card-title library-item-name'>
										<span className='library-item-size'>
											{libraryItem.size}
										</span>
										{libraryItem.name}
									</h4>
									{/* If and when location data exists, it should be displayed here. */}
									<small>{libraryItem.desc}</small>
								</div>
							</CardBody>

							<Collapse
								isOpen={isOpen === libraryItem._id}
								className='library-item-collapse-lower'>
								<CardBody className='bg-2 text-dark library-item-upcs p-0'>
									<ul>
										{libraryItem.upcs.map((upc) => (
											<li key={upc}>
												<p className='library-item-upc'>
													{upc}
												</p>
											</li>
										))}
									</ul>
								</CardBody>
							</Collapse>
						</Card>
					))}
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	currentPicklist: state.picklist.currentPicklist,
	libraryItems: state.library.libraryItems,
	librarySearch: state.library.librarySearch,
	librarySearchTerm: state.library.librarySearchTerm,
	user: state.auth.user,
});

export default connect(mapStateToProps, { deleteLibraryItem })(LibraryItems);
