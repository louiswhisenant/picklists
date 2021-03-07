import {
	GET_PICKLIST,
	GET_PICKLISTS,
	ADD_PICKLIST,
	UPDATE_PICKLIST,
	SUBMIT_PICKLIST,
	DELETE_PICKLIST,
	GET_CURRENT_PICKLIST,
	CLEAR_CURRENT_PICKLIST,
	SET_CURRENT,
	PICKLISTS_LOADING,
} from '../actions/types';

const initialState = {
	currentPicklist: null,
	picklists: [],
	picklistLoading: false,
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		// case NAME_OF_CASE:
		// 	return {
		// 		...state,
		// 		stateVar: value,
		// 	};
		// Next Case
		// case GET_PICKLIST:
		// 	return {
		// 		...state,
		// 		stateVar: value,
		// 	};
		case GET_PICKLIST:
			return {
				...state,
				picklistLoading: false,
			};
		case GET_PICKLISTS:
			return {
				...state,
				picklists: action.payload,
				picklistLoading: false,
			};
		case ADD_PICKLIST:
			return {
				...state,
				picklists: [...state.picklists, action.payload],
				picklistLoading: false,
			};
		case UPDATE_PICKLIST:
			return {
				...state,
				currentPicklist: action.payload,
				picklists: state.picklists.map((picklist) =>
					picklist._id === action.payload._id
						? action.payload
						: picklist
				),
				picklistLoading: false,
			};
		case SUBMIT_PICKLIST:
			return {
				...state,
				currentPicklist: null,
				picklists: state.picklists.map((picklist) =>
					picklist._id === action.payload._id
						? action.payload
						: picklist
				),
				picklistLoading: false,
			};
		case DELETE_PICKLIST:
			return {
				...state,
				picklists: state.picklists.filter(
					(picklist) => picklist._id !== action.payload
				),
			};
		case GET_CURRENT_PICKLIST:
			return {
				...state,
				currentPicklist: action.payload,
				picklistLoading: false,
			};
		case CLEAR_CURRENT_PICKLIST:
			return {
				...state,
				currentPicklist: null,
			};
		case SET_CURRENT:
			return {
				...state,
				currentPicklist: action.payload,
			};
		case PICKLISTS_LOADING:
			return {
				...state,
				picklistLoading: true,
			};
		default:
			return state;
	}
}
