import instance from '../config/axiosConfig'
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
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
		

// Dispatchers
export const login = (data) => async dispatch => {
    console.log('in action', data)
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