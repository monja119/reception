import { combineReducers } from 'redux';
import userReducer from './users/userReducer.js';

const rootReducer = combineReducers({
    reception_user: userReducer
});

export default rootReducer;
