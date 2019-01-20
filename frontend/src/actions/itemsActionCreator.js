import instance from '../config/axiosConfig'
import {
        FETCH_ITEMS_REQUEST, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE,
        FETCH_FAVOURITE_ITEMS_REQUEST, FETCH_FAVOURITE_ITEMS_SUCCESS, FETCH_FAVOURITE_ITEMS_FAILURE
    } from './itemsActionTypes';
  
    function onItemsFetch(data) {
        return {
        type: FETCH_ITEMS_SUCCESS,
        payload: data
        };
    }
    
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
    export const fetchItems = (keyword) => async dispatch => {
        if(!keyword){
            const data = {
                data: []
            };
            dispatch(onItemsFetch(data))
        }
        const result = await instance.get(`items/keyword/${keyword}`)
        console.log(result);
        dispatch(onItemsFetch(result.data));
    }
    
    export const fetchFavouriteItems = () => async dispatch => {
        const result = await instance.get('items/favourites');
        dispatch(onFavouriteItemsFetch(result.data))
    };

    // export const updateItemFavourite = (id, params) =>
    //     dispatch => dispatch(onUpdateFavourite(id, params));