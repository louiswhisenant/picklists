import {
	GET_ITEM,
	GET_LIBRARY,
	ADD_LIBRARY_ITEM,
	UPDATE_LIBRARY_ITEM,
	DELETE_LIBRARY_ITEM,
	SEARCH_LIBRARY,
	CLEAR_LIBRARY_SEARCH,
	SET_LIBRARY_CURRENT,
	CLEAR_LIBRARY_CURRENT,
	LIBRARY_LOADING,
} from '../actions/types';

const initialState = {
	currentLibraryItem: null,
	libraryItems: [],
	librarySearch: [],
	librarySearchTerm: null,
	libraryLoading: false,
};

export default function libraryReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ITEM:
			return {
				...state,
				currentLibraryItem: action.payload,
				libraryLoading: false,
			};
		case GET_LIBRARY:
			return {
				...state,
				libraryItems: action.payload,
				libraryLoading: false,
			};
		case ADD_LIBRARY_ITEM:
			return {
				...state,
				libraryItems: [...state.libraryItems, action.payload],
				libraryLoading: false,
			};
		case UPDATE_LIBRARY_ITEM:
			return {
				...state,
				libraryItems: state.libraryItems.filter((item) =>
					item._id === action.payload._id ? action.payload : item
				),
				libraryLoading: false,
			};
		case DELETE_LIBRARY_ITEM:
			return {
				...state,
				libraryItems: state.libraryItems.filter(
					(item) => item._id !== action.payload
				),
			};
		case SEARCH_LIBRARY:
			return {
				...state,
				librarySearch: state.libraryItems.filter((item) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					const textToSearch = `
						${item.name}
						 ${item.size && item.size}
						 ${item.desc && item.desc}
						 ${item.upcs.join(' ')}
						`;
					return textToSearch.match(regex);
				}),
				librarySearchTerm: action.payload,
			};
		case CLEAR_LIBRARY_SEARCH:
			return {
				...state,
				librarySearch: [],
				librarySearchTerm: null,
			};
		case SET_LIBRARY_CURRENT:
			return {
				...state,
				currentLibraryItem: action.payload,
			};
		case CLEAR_LIBRARY_CURRENT:
			return {
				...state,
				currentLibraryItem: null,
			};
		case LIBRARY_LOADING:
			return {
				...state,
				libraryLoading: true,
			};
		default:
			return state;
	}
}
