import instance from '../config/axiosConfig'
import {
    FETCH_SUBMISSONS_REQUEST, FETCH_SUBMISSONS_SUCCESS, FETCH_SUBMISSONS_FAILURE,
    FETCH_USER_SUBMISSONS_REQUEST, FETCH_USER_SUBMISSONS_SUCCESS, FETCH_USER_SUBMISSONS_FAILURE,
    CREATE_SUBMISSON_REQUEST, CREATE_SUBMISSON_SUCCESS, CREATE_SUBMISSON_FAILURE,
} from './jobsActionTypes';
  
// Create
function requestCreateSubmission() {
    return {
        type: CREATE_SUBMISSON_REQUEST,
        };
}
function acceptCreateSubmission(data) {
	return {
        type: CREATE_SUBMISSON_SUCCESS,
	};
}
function rejectCreateSubmission(data) {
	return {
        type: CREATE_SUBMISSON_FAILURE,
        err: data.message,
	};
}

// Fetch
function requestFetchSubmissions() {
    return {
        type: FETCH_SUBMISSONS_REQUEST,
        };
}
function acceptFetchSubmissions(data) {
	return {
        type: FETCH_SUBMISSONS_SUCCESS,
        data: data,
	};
}
function rejectFetchSubmissions(data) {
	return {
        type: FETCH_SUBMISSONS_FAILURE,
        err: data.message,
	};
}

// Fetch by user
function requestFetchSubmissionsByUser() {
    return {
        type: FETCH_SUBMISSONS_REQUEST,
        };
}
function acceptFetchSubmissionsByUser(data) {
	return {
        type: FETCH_SUBMISSONS_SUCCESS,
        data: data,
	};
}
function rejectFetchSubmissionsByUser(data) {
	return {
        type: FETCH_SUBMISSONS_FAILURE,
        err: data.message,
	};
}

// Dispatchers
export const createSubmission = (data) => async dispatch => {
    dispatch(requestCreateSubmission());

    try {
        const result = await instance.post('submissions', data);
        dispatch(acceptCreateSubmission(result));
    } catch(e) {
        console.log(e.response.data)
        dispatch(rejectCreateSubmission(e.response.data));
    }
}

// Dispatchers
export const fetchSubmissions = (data) => async dispatch => {
    dispatch(requestFetchSubmissions());

    try {
        const result = await instance.get('submissions/job/'+data);
        dispatch(acceptFetchSubmissions(result));
    } catch(e) {
        console.log(e.response.data)
        dispatch(rejectFetchSubmissions(e.response.data));
    }
}

// Dispatchers
export const fetchSubmissionsByUser = (data) => async dispatch => {
    dispatch(requestFetchSubmissionsByUser());

    try {
        const result = await instance.get('submissions/user');
        dispatch(acceptFetchSubmissionsByUser(result));
    } catch(e) {
        console.log(e.response.data)
        dispatch(rejectFetchSubmissionsByUser(e.response.data));
    }
}
