import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
import {
	GET_PICKLIST,
	GET_PICKLISTS,
	ADD_PICKLIST,
	UPDATE_PICKLIST,
	SUBMIT_PICKLIST,
	DELETE_PICKLIST,
	GET_CURRENT_PICKLIST,
	SET_CURRENT,
	CLEAR_CURRENT_PICKLIST,
	FILTER_PICKLISTS,
	CLEAR_FILTER,
	PICKLISTS_LOADING,
} from './types';

// Get Picklist
export const getCurrentPicklist = (id) => (dispatch, getState) => {
	dispatch(setPicklistLoading());
	axios
		.get(`/api/picklists/${id}`, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: GET_CURRENT_PICKLIST,
				payload: res.data,
			})
		)
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

// Get Picklists
export const getPicklists = () => (dispatch, getState) => {
	dispatch(setPicklistLoading());
	axios
		.get('/api/picklists', tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: GET_PICKLISTS,
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

// Create Picklist
export const addPicklist = (picklist) => (dispatch, getState) => {
	dispatch(setPicklistLoading());
	axios
		.post('/api/picklists', picklist, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: ADD_PICKLIST,
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

// Add Picklist Item
export const addPicklistItem = (picklist, upc) => (dispatch, getState) => {
	dispatch(setPicklistLoading());
	axios
		.get(`api/library/${upc}`, tokenConfig(getState))
		.then((getRes) => {
			picklist.items.push(getRes.data);
			axios
				.put(
					`/api/picklists/${picklist._id}`,
					picklist,
					tokenConfig(getState)
				)
				.then((putRes) => {
					dispatch({
						type: UPDATE_PICKLIST,
						payload: putRes.data,
					});
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

// Update Picklist
export const updatePicklist = (picklist) => (dispatch, getState) => {
	dispatch(setPicklistLoading());
	axios
		.put(`api/picklists/${picklist._id}`, picklist, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: UPDATE_PICKLIST,
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

// Submit Picklist
export const submitPicklist = (picklist) => (dispatch, getState) => {
	dispatch(setPicklistLoading());
	axios
		.put(`api/picklists/${picklist._id}`, picklist, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: SUBMIT_PICKLIST,
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

// Delete Picklist
export const deletePicklist = (id) => (dispatch, getState) => {
	axios
		.delete(`/api/picklists/${id}`, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: DELETE_PICKLIST,
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

// Set Current Picklist
export const setCurrent = (picklist) => (dispatch) => {
	dispatch({ type: SET_CURRENT, payload: picklist });
};

// Clear Current Picklist
export const clearCurrentPicklist = () => (dispatch) => {
	dispatch({ type: CLEAR_CURRENT_PICKLIST });
};

// Filter Contacts
export const filterPicklists = (searchTerm) => (dispatch) => {
	dispatch({ type: FILTER_PICKLISTS, payload: searchTerm });
};

// Clear Contacts Filter
export const clearFilterPicklists = () => (dispatch) => {
	dispatch({ type: CLEAR_FILTER });
};

// Set Picklists Loading
export const setPicklistLoading = () => {
	return {
		type: PICKLISTS_LOADING,
	};
};
