import * as ActionTypes from './actionTypes';

export const accept = (state = {
        isLoading: true,
        errMess: null,
        accept: (localStorage.getItem('doc')!==null)?false:true,
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_ACCEPT:
            return {...state, isLoading: false, errMess: null, accept:true};
        case ActionTypes.REMOVE_ACCEPT:
            return {...state,isLoading: false, errMess: null, accept:false}    
        default:
            return state;
    }
}