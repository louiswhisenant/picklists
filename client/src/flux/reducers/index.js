import { combineReducers } from 'redux';
import picklistReducer from './picklistReducer';
import libraryReducer from './libraryReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
	picklist: picklistReducer,
	library: libraryReducer,
	auth: authReducer,
	error: errorReducer,
});
