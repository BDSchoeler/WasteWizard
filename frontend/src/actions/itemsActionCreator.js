import instance from '../config/axiosConfig'
import {
	FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE,
	FETCH_FAVOURITE_ITEMS_SUCCESS, FETCH_FAVOURITE_ITEMS_FAILURE,
	UPDATE_ITEM_SUCCESS, UPDATE_ITEM_FAILURE
} from './itemsActionTypes';
  
// Fetch Items by Keyword
function acceptItemsFetch(data, keyword) {
	return {
	type: FETCH_ITEMS_SUCCESS,
	payload: data,
	keyword
	};
}
function rejectItemsFetch(data) {
	return {
	type: FETCH_ITEMS_FAILURE,
	err: data,
	};
}
		
// Fetch All Favourite Items
function acceptFavouriteItemsFetch(data) {
	return {
		type: FETCH_FAVOURITE_ITEMS_SUCCESS,
		payload: data
	};
}
function rejectFavouriteItemsFetch(data) {
	return {
		type: FETCH_FAVOURITE_ITEMS_FAILURE,
		err: data
	};
}
// Update Item Favourite Status
function acceptUpdateFavourite(data) {
	return {
		type: UPDATE_ITEM_SUCCESS,
		payload: data.success
	};
}
function rejectUpdateFavourite(data) {
	return {
		type: UPDATE_ITEM_FAILURE,
		err: data
	};
}

// Dispatchers
export const fetchItems = (keyword) => async dispatch => {
	if (!keyword) {
		const data = {
				data: []
		};
		dispatch(acceptItemsFetch(data, keyword));
	} else {
		try {
			const result = await instance.get(`items/keyword/${keyword}`);
			dispatch(acceptItemsFetch(result.data, keyword));
		} catch(e) {
			dispatch(rejectItemsFetch(e));
		}
	}
}

export const fetchFavouriteItems = () => async dispatch => {
	try {
		const result = await instance.get('items/favourites');
		dispatch(acceptFavouriteItemsFetch(result.data));
	} catch(e) {
		dispatch(rejectFavouriteItemsFetch(e))
	}
};

export const updateItemFavourite = (id, params) => async dispatch => {
	try {
		const result = await instance.put(`items/${id}`, {...params});
		dispatch(acceptUpdateFavourite(result.data.data));
	} catch(e) {
		dispatch(rejectUpdateFavourite(e));
	}
};