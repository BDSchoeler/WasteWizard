import * as types from '../actions/itemsActionTypes';
import initialState from './intialState';

export default (state = initialState.items, action) => {
	switch (action.type) {
        // Fetch Items with Keyword
		case types.FETCH_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
                items: []
            };
            break;
        case types.FETCH_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.data,
                keyword: action.keyword,
            };
            break;
        case types.FETCH_ITEMS_FAILURE:
            return {
                ...state,
                loading: false,
                items: [],
                err: action.err,
             };
            break;
        // Fetch All Favourite Items
        case types.FETCH_FAVOURITE_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
                favourites: [] }
            break;
        case types.FETCH_FAVOURITE_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                favourites: action.payload.data
            };
            break;
        case types.FETCH_FAVOURITE_ITEMS_FAILURE:
            return {
                ...state,
                loading: false,
                err: action.err,
                favourites: []
             };
            break;
        // Update Item Favourite Status
        case types.UPDATE_ITEM_REQUEST:
            return {
                ...state,
                success: false
            };
            break;
        case types.UPDATE_ITEM_SUCCESS:
            return {
                ...state,
                success: action.succcess
            };
            break;
        case types.UPDATE_ITEM_FAILURE:
            return {
                ...state,
                success: false,
                err: action.err
            };
            break;
        // Default
		default:
             return state;
	}
}