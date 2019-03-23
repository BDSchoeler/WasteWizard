import instance from '../config/axiosConfig'
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
} from './authActionTypes';
  
// Login
function requestLogin() {
    return {
        type: LOGIN_REQUEST,
        };
}
function acceptLogin(data) {
	return {
        type: LOGIN_SUCCESS,
        currentUser: data.user,
        token: data.token
	};
}
function rejectLogin(data) {
	return {
	type: LOGIN_FAILURE,
	err: data.message,
	};
}

// Register
function requestRegister() {
    return {
        type: REGISTER_REQUEST,
        };
}
function acceptRegister(data) {
	return {
        type: REGISTER_SUCCESS,
	};
}
function rejectRegister(data) {
	return {
	type: REGISTER_FAILURE,
	err: data.message,
	};
}

// Logout
function acceptLogout(data) {
	return {
        type: LOGOUT_SUCCESS,
	};
}	

// Dispatchers
export const login = (data) => async dispatch => {
    dispatch(requestLogin());

    // const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    // }
    try {
        const result = await instance.post('users/login', data);
        dispatch(acceptLogin(result));
    } catch(e) {
        console.log(e.response.data)
        dispatch(rejectLogin(e.response.data));
    }
}

export const logout = () => async dispatch => {
    //Todo: remove from storage as well
    dispatch(acceptLogout());
}

export const register = (data) => async dispatch => {
    dispatch(requestRegister());

    // const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    // }
    try {
        const result = await instance.post('users/register', data);
        dispatch(acceptRegister(result));
    } catch(e) {
        console.log(e.response.data)
        dispatch(rejectRegister(e.response.data));
    }
}