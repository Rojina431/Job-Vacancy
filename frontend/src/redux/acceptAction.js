
import * as ActionTypes from './actionTypes'

export const postFavorite = (acceptance) => (dispatch) => {
  if(acceptance){
    dispatch({
      type:ActionTypes.ADD_ACCEPT
    })
  }    
  }

  export const removeFavorite = (acceptance) => (dispatch) => {
    if(acceptance===false){
      
      dispatch({
        type:ActionTypes.REMOVE_ACCEPT,
      })
    }
      
  }

  export const postRejected = (rejection) => (dispatch) => {
    if(rejection){
      dispatch({
        type:ActionTypes.ADD_REJECT
      })
    }    
    }
  
    export const removeRejected = (rejection) => (dispatch) => {
      if(!rejection){
        
        dispatch({
          type:ActionTypes.REMOVE_REJECT,
        })
      }
        
    }
  
    