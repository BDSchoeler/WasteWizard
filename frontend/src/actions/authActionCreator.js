import instance from '../config/axiosConfig'
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
    FETCH_CURRENT_USER_SUCCESS,
    UPDATE_FAILURE,UPDATE_REQUEST,UPDATE_SUCCESS
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

// UPDATE
function requestUpdate() {
    return {
        type: UPDATE_REQUEST,
        };
}
function acceptUpdate(data) {
	return {
        type: UPDATE_SUCCESS,
        data
	};
}
function rejectUpdate(data) {
	return {
	type: UPDATE_FAILURE,
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
    }
}

export const updateUser = (token, data) => async dispatch => {
    dispatch(requestUpdate());

    try {
        const result = await instance.put('users', data);
        const info = {
            data: {
                token,
                user: result.data
            }
        }
        localStorage.setItem('token', JSON.stringify(info));
        dispatch(acceptUpdate(info.data));
    } catch(e) {
        console.log(e.response.data)
        dispatch(rejectUpdate(e.response.data));
    }
}