import * as types from '../actions/itemsActionTypes';
import initialState from './intialState';

export default (state = initialState.items, action) => {
	switch (action.type) {
		// Fetch Items with Keyword
		case types.FETCH_ITEMS_SUCCESS:
			return {
				...state,
				loading: false,
				items: action.payload.data,
				keyword: action.keyword,
			};
		case types.FETCH_ITEMS_FAILURE:
			return {
				...state,
				loading: false,
				items: [],
				err: action.err,
				};
		// Fetch All Favourite Items
		case types.FETCH_FAVOURITE_ITEMS_SUCCESS:
			return {
				...state,
				loading: false,
				favourites: action.payload.data
			};
		case types.FETCH_FAVOURITE_ITEMS_FAILURE:
			return {
				...state,
				loading: false,
				err: action.err,
				favourites: []
				};
		// Update Item Favourite Status
		case types.UPDATE_ITEM_SUCCESS:
			return {
				...state,
				success: action.succcess
			};
		case types.UPDATE_ITEM_FAILURE:
			return {
				...state,
				success: false,
				err: action.err
			};
		// Default
		default:
			return state;
	}
}