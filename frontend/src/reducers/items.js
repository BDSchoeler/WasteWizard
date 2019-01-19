import typeToReducer from 'type-to-reducer';
import * as types from '../actions/itemsActionTypes'
import initialState from './intialState';

export default (state = initialState.items, action) => {
	switch (action.type) {
		// case types.FETCH_ITEMS_REQUEST:
        //     return {
        //         pending: true,
        //         items: [] };
        //     break;
        // case types.FETCH_ITEMS_SUCCESS:
        //     return {
        //         pending: false,
        //         items: action.items,
        //     };
        //     break;
        // case types.FETCH_ITEMS_FAILURE:
        //     return {
        //         pending: false,
        //         items: [],
        //         err: action.err,
        //      };
        //     break;
        case types.FETCH_FAVOURITE_ITEMS_REQUEST:
            return {
                loading: true,
                items: [] }
            break;
        case types.FETCH_FAVOURITE_ITEMS_SUCCESS:
            return {
                loading: false,
                items: action.payload.data
            };
            break;
        case types.FETCH_FAVOURITE_ITEMS_FAILURE:
            return {
                loading: false,
                err: action.err,
                items: []
             };
            break;
		default:
             return state;
	}
}