import * as types from '../actions/jobsActionTypes';
import initialState from './intialState';

export default (state = initialState.jobsReducer, action) => {
	switch (action.type) {
        // Fetch Jobs with Keyword
        case types.FETCH_JOBS_REQUEST:
            return {
                ...state,
                loading: true,
                err: null
            };
		case types.FETCH_JOBS_SUCCESS:
			return {
				...state,
				loading: false,
				list: action.data,
			};
		case types.FETCH_JOBS_FAILURE:
			return {
				...state,
				loading: false,
				list: [],
				err: action.err,
				};
		// Default
		default:
			return state;
	}
}