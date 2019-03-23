import instance from '../config/axiosConfig'
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
    FETCH_CURRENT_USER_SUCCESS,
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

// Fetch Current User
function acceptFetchCurrentUser(data){
    return {
        type: FETCH_CURRENT_USER_SUCCESS,
        data: data
    };
}

// Dispatchers
export const login = (data) => async dispatch => {
    dispatch(requestLogin());

    try {
        const result = await instance.post('users/login', data);
        localStorage.setItem('token', JSON.stringify(result));
        dispatch(acceptLogin(result));
    } catch(e) {
        console.log(e.response.data)
        dispatch(rejectLogin(e.response.data));
    }
}

export const logout = () => async dispatch => {
    localStorage.removeItem('token');
    dispatch(acceptLogout());
}

export const register = (data) => async dispatch => {
    dispatch(requestRegister());

    try {
        const result = await instance.post('users/register', data);
        dispatch(acceptRegister(result));
    } catch(e) {
        console.log(e.response.data)
        dispatch(rejectRegister(e.response.data));
    }
}

export const fetchCurrentUser = (data) => async dispatch => {
    const currentUser = localStorage.getItem('token');
    if(currentUser){
        const parsedCurrentUser = JSON.parse(currentUser);
        dispatch(acceptFetchCurrentUser(parsedCurrentUser.data))
        console.log(parsedCurrentUser.data)
    }
}