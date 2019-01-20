import instance from '../config/axiosConfig'
import {
        FETCH_ITEMS_REQUEST, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE,
        FETCH_FAVOURITE_ITEMS_REQUEST, FETCH_FAVOURITE_ITEMS_SUCCESS, FETCH_FAVOURITE_ITEMS_FAILURE,
        UPDATE_ITEM_REQUEST, UPDATE_ITEM_SUCCESS, UPDATE_ITEM_FAILURE
    } from './itemsActionTypes';
  
    function onItemsFetch(data, keyword) {
        return {
        type: FETCH_ITEMS_SUCCESS,
        payload: data,
        keyword
        };
    }
    
    function onFavouriteItemsFetch(data) {
        return {
            type: FETCH_FAVOURITE_ITEMS_SUCCESS,
            payload: data
        };
    }
    
    function onUpdateFavourite(data) {
        return {
            type: UPDATE_ITEM_SUCCESS,
            payload: data
        };
    }

  
    // Dispatchers
    export const fetchItems = (keyword) => async dispatch => {
        if(!keyword){
            const data = {
                data: []
            };
            dispatch(onItemsFetch(data))
        }
        const result = await instance.get(`items/keyword/${keyword}`)
        dispatch(onItemsFetch(result.data, keyword));
    }
    
    export const fetchFavouriteItems = () => async dispatch => {
        const result = await instance.get('items/favourites');
        dispatch(onFavouriteItemsFetch(result.data))
    };

    export const updateItemFavourite = (id, params) => async dispatch => {
        const results = await instance.put(`items/${id}`, {...params});
        dispatch(onUpdateFavourite(results));
    };