import * as types from '../actions/authActionTypes';
import initialState from './intialState';

export default (state = initialState.authReducer, action) => {
	switch (action.type) {
        // Login
        case types.LOGIN_REQUEST:
            return {
                ...state,
				loading: true,
				err: null
            }
		case types.LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
                currentUser: action.currentUser,
                token: action.token,
				authenticated: true,
				err: null,
			};
		case types.LOGIN_FAILURE:
			return {
				...state,
                loading: false,
                currentUser: {},
                authenticated: false,
				err: action.err,
			};
		// Register
		case types.REGISTER_REQUEST:
			return {
				...state,
				loading: true,
				err: null
			}
		case types.REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				registered: true,
				err: null,
			};
		case types.REGISTER_FAILURE:
			return {
				...state,
				loading: false,
				registered: false,
				err: action.err,
			};
		// Logout
		case types.LOGOUT_SUCCESS:
			return {
				...state,
				authenticated: false,
				token: null,
				currentUser: null
			}
		// Fetch Current User
		case types.FETCH_CURRENT_USER_SUCCESS:
			return {
				...state,
				authenticated: true,
				token: action.data.token,
				currentUser: action.data.user
			}
		// Register
		case types.UPDATE_REQUEST:
			return {
				...state,
				loading: true,
				err: null
			}
		case types.UPDATE_SUCCESS:
			return {
				...state,
				loading: false,
				updateSuccess: true,
				currentUser: action.data.user,
				err: null,
			};
		case types.UPDATE_FAILURE:
			return {
				...state,
				loading: false,
				updateSuccess: false,
				err: action.err,
			};
		// Default
		default:
			return state;
	}
}