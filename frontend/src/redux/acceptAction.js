import axios from "axios";
import * as ActionTypes from './actionTypes'

export const postFavorite = (acceptance) => (dispatch) => {
  if(acceptance){
    dispatch({
      type:ActionTypes.ADD_ACCEPT
    })
  }    
  }

  export const removeFavorite = (rejection) => (dispatch) => {
    if(!rejection){
      
      dispatch({
        type:ActionTypes.REMOVE_ACCEPT,
      })
    }
      
  }
  
    