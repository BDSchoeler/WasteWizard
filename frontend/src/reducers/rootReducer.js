import { combineReducers } from 'redux';
import itemReducer from './items';
import authReducer  from './auth';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
 itemReducer,
 authReducer,
 router: routerReducer 
});

export default rootReducer;