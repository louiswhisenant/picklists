import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
import {
	GET_PICKLISTS,
	ADD_PICKLIST,
	UPDATE_PICKLIST,
	SUBMIT_PICKLIST,
	DELETE_PICKLIST,
	GET_CURRENT_PICKLIST,
	CLEAR_CURRENT_PICKLIST,
	GET_RETRIEVE_PICKLIST,
	CLEAR_RETRIEVE_PICKLIST,
	FILTER_PICKLISTS,
	CLEAR_FILTER,
	PICKLISTS_LOADING,
} from './types';

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
					`[getPicklists] ${err.response.data.msg}`,
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
					`[addPicklist] ${err.response.data.msg}`,
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
					dispatch({
						type: GET_CURRENT_PICKLIST,
						payload: putRes.data,
					});
				});
		})
		.catch((err) => {
			dispatch(
				returnErrors(
					`[addPicklistItem] ${err.response.data.msg}`,
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
			if (res.data.status === 'submitted') {
				dispatch({ type: GET_CURRENT_PICKLIST });
			} else if (res.data.status === 'submitted') {
				dispatch({ type: CLEAR_CURRENT_PICKLIST });
			} else if (res.data.status === 'retrieving') {
				dispatch({
					type: GET_RETRIEVE_PICKLIST,
					payload: res.data,
				});
			} else if (res.data.status === 'retrieved') {
				dispatch({ type: CLEAR_RETRIEVE_PICKLIST });
			}
		})
		.catch((err) => {
			dispatch(
				returnErrors(
					`[updatePicklist] ${err.response.data.msg}`,
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
			if (res.data.status === 'submitted') {
				dispatch({
					type: CLEAR_CURRENT_PICKLIST,
				});
			}
		})
		.catch((err) => {
			dispatch(
				returnErrors(
					`[submitPicklist] ${err.response.data.msg}`,
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
		.catch(
			(err) => console.log(err)
			// dispatch(
			// 	returnErrors(
			// 		`[deletePicklist] ${err.response.data.msg}`,
			// 		'danger',
			// 		err.response.status
			// 	)
			// )
		);
};

// Get Current Picklist
export const getCurrentPicklist = (id, status) => (dispatch, getState) => {
	dispatch(setPicklistLoading());
	axios
		.get(`/api/picklists/${id}/${status}`, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: GET_CURRENT_PICKLIST,
				payload: res.data,
			})
		)
		.catch((err) => {
			if (err.response.status !== 404) {
				console.log(`${err.response.status}`);
				dispatch(
					returnErrors(
						`[getCurrentPicklist] ${err.response.data.msg}`,
						'danger',
						err.response.status
					)
				);
			}
		});
};

// Clear Current Picklist
export const clearCurrentPicklist = () => (dispatch) => {
	dispatch({ type: CLEAR_CURRENT_PICKLIST });
};

// Get Retrieve Picklist
export const getRetrievePicklist = (id, status) => (dispatch, getState) => {
	dispatch(setPicklistLoading());
	axios
		.get(`/api/picklists/${id}/${status}`, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: GET_RETRIEVE_PICKLIST,
				payload: res.data,
			})
		)
		.catch((err) => {
			if (err.response.status !== 404) {
				dispatch(
					returnErrors(
						`[getRetrievePicklist] ${err.response.data.msg}`,
						'danger',
						err.response.status
					)
				);
			}
		});
};

// Clear Retrieve Picklist
export const clearRetrievePicklist = () => (dispatch) => {
	dispatch({ type: CLEAR_RETRIEVE_PICKLIST });
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
