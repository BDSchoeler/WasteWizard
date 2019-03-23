import { combineReducers } from 'redux';
import itemReducer from './items';
import authReducer  from './auth';
import jobsReducer from './jobs';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
 itemReducer,
 authReducer,
 jobsReducer,
 router: routerReducer 
});

export default rootReducer;