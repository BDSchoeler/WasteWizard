import instance from '../config/axiosConfig'
import {
        FETCH_FAVOURITE_ITEMS_FAILURE,FETCH_FAVOURITE_ITEMS_SUCCESS, FETCH_FAVOURITE_ITEMS_REQUEST
    } from './itemsActionTypes';
  
    // export function onItemsFetch(params) {
    //     return {
    //     type: FETCH_ITEMS,
    //     payload: instance.get('', { params })
    //     };
    // }
    
    function onFavouriteItemsFetch(data) {
        return {
            type: FETCH_FAVOURITE_ITEMS_SUCCESS,
            payload: data
        };
    }
    
    // export function onUpdateFavourite(id, params) {
    //     return {
    //     type: UPDATE_ITEM,
    //     payload: instance.get(`/${id}`, { params})
    //     };
    // }

  
    // Dispatchers
    // export const fetchItems = (params) =>
    //     dispatch => dispatch(onItemsFetch(params));
    
    export const fetchFavouriteItems = () => async dispatch => {
        const result = await instance.get('items/favourites');
        dispatch(onFavouriteItemsFetch(result.data))
    };

    // export const updateItemFavourite = (id, params) =>
    //     dispatch => dispatch(onUpdateFavourite(id, params));