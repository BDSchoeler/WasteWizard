import instance from '../config/axiosConfig'
import request from 'request';
import {
    FETCH_JOBS_REQUEST, FETCH_JOBS_SUCCESS, FETCH_JOBS_FAILURE,
    CREATE_JOB_REQUEST, CREATE_JOB_SUCCESS, CREATE_JOB_FAILURE,
} from './jobsActionTypes';
  
// Create
function requestCreateJob() {
    return {
        type: CREATE_JOB_REQUEST,
        };
}
function acceptCreateJob(data) {
	return {
        type: CREATE_JOB_SUCCESS,
	};
}
function rejectCreateJob(data) {
	return {
        type: CREATE_JOB_FAILURE,
        err: data.message,
	};
}

// Fetch
function requestFetchJobs() {
    return {
        type: FETCH_JOBS_REQUEST,
        };
}
function acceptFetchJobs(data) {
	return {
        type: FETCH_JOBS_SUCCESS,
        data
	};
}
function rejectFetchJobs(data) {
	return {
        type: FETCH_JOBS_FAILURE,
        err: data.message,
	};
}

// Dispatchers
export const createJob = (data) => async dispatch => {
    dispatch(requestCreateJob());

    try {
        const result = await instance.post('/jobs', data);
        dispatch(acceptCreateJob(result));
    } catch(e) {
        console.log(e.response.data)
        dispatch(rejectCreateJob(e.response.data));
    }
}

// Dispatchers
export const fetchJobs = (keywords) => async dispatch => {
    dispatch(requestFetchJobs());

    try {
        const url = `/jobs?searchPattern=${keywords}`;
        const result = await instance.get(url);
        console.log(result.data.data)
        dispatch(acceptFetchJobs(result.data.data));
    } catch(e) {
        console.log(e.response)
        dispatch(rejectFetchJobs(e.response));
    }
}
