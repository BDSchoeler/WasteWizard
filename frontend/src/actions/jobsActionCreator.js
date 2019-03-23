import instance from '../config/axiosConfig'
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
        data: data,
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
        const result = await instance.post('jobs', data);
        dispatch(acceptCreateJob(result));
    } catch(e) {
        console.log(e.response.data)
        dispatch(rejectCreateJob(e.response.data));
    }
}

// Dispatchers
export const fetchJobs = (data) => async dispatch => {
    dispatch(requestFetchJobs());

    try {
        const result = await instance.get('jobs?searchPattern='+data);
        dispatch(acceptFetchJobs(result));
    } catch(e) {
        console.log(e.response.data)
        dispatch(rejectFetchJobs(e.response.data));
    }
}