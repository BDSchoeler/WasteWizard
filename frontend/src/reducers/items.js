import typeToReducer from 'type-to-reducer';
import * as types from '../actions/itemsActionTypes'
import initialState from './intialState';

export default (state = initialState.items, action) => {
	switch (action.type) {
        // Fetch Items with Keyword
		case types.FETCH_ITEMS_REQUEST:
            return {
                loading: true,
                items: []
            };
            break;
        case types.FETCH_ITEMS_SUCCESS:
            return {
                loading: false,
                items: action.payload.data,
            };
            break;
        case types.FETCH_ITEMS_FAILURE:
            return {
                loading: false,
                items: [],
                err: action.err,
             };
            break;
        // Fetch All Favourite Items
        case types.FETCH_FAVOURITE_ITEMS_REQUEST:
            return {
                loading: true,
                favourites: [] }
            break;
        case types.FETCH_FAVOURITE_ITEMS_SUCCESS:
            return {
                loading: false,
                favourites: action.payload.data
            };
            break;
        case types.FETCH_FAVOURITE_ITEMS_FAILURE:
            return {
                loading: false,
                err: action.err,
                favourites: []
             };
            break;
        // Update Item Favourite Status
        // Default
		default:
             return state;
	}
}