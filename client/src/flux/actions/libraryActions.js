import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
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
} from './types';

// Get single Library item
export const getLibraryItem = (upc) => (dispatch, getState) => {
	dispatch(setLibraryLoading());
	axios
		.get(`/api/library/${upc}`, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: GET_ITEM,
				payload: res.data,
			})
		)
		.catch((err) => {
			console.log(err);
		});
};

// Get all library Items
export const getLibrary = () => (dispatch, getState) => {
	dispatch(setLibraryLoading());
	axios
		.get(`api/library/`, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: GET_LIBRARY,
				payload: res.data,
			})
		)
		.catch((err) => {
			console.log(err);
		});
};

// Create New Library Item
export const addLibraryItem = (libraryItem) => (dispatch, getState) => {
	dispatch(setLibraryLoading());
	axios
		.post('/api/library', libraryItem, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: ADD_LIBRARY_ITEM,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch(
				returnErrors(
					err.response.data.msg,
					'danger',
					err.response.status
				)
			)
		);
};

// Update Library Item
export const updateLibraryItem = (libraryItem) => (dispatch, getState) => {
	dispatch(setLibraryLoading());
	axios
		.put(
			`api/library/${libraryItem._id}`,
			libraryItem,
			tokenConfig(getState)
		)
		.then((res) => {
			dispatch({
				type: UPDATE_LIBRARY_ITEM,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch(
				returnErrors(
					err.response.data.msg,
					'danger',
					err.response.status
				)
			);
		});
};

// Delete Library Item
export const deleteLibraryItem = (id) => (dispatch, getState) => {
	axios
		.delete(`/api/library/${id}`, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: DELETE_LIBRARY_ITEM,
				payload: id,
			})
		)
		.catch((err) =>
			dispatch(
				returnErrors(
					err.response.data.msg,
					'danger',
					err.response.status
				)
			)
		);
};

// Search Library
export const searchLibrary = (search) => (dispatch) => {
	dispatch({
		type: SEARCH_LIBRARY,
		payload: search,
	});
};

// Clear Library Search
export const clearLibrarySearch = () => (dispatch) => {
	dispatch({
		type: CLEAR_LIBRARY_SEARCH,
	});
};

// Set Current Library Item
export const setLibraryCurrent = (item) => (dispatch) => {
	dispatch({
		type: SET_LIBRARY_CURRENT,
		payload: item,
	});
};

// Clear Current Library Item
export const clearLibraryCurrent = () => (dispatch) => {
	dispatch({
		type: CLEAR_LIBRARY_CURRENT,
	});
};

// Set Library Loading
export const setLibraryLoading = () => {
	return {
		type: LIBRARY_LOADING,
	};
};
