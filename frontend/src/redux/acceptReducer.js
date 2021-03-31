import * as ActionTypes from './actionTypes';

export const accept = (state = {
        isLoading: true,
        errMess: null,
        accept: localStorage.getItem('accept')==="null"?false:true,
        reject: localStorage.getItem('reject')==="null"?false:true
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_ACCEPT:
            return {...state, isLoading: false, errMess: null, accept:true};
        case ActionTypes.REMOVE_ACCEPT:
            return {...state,isLoading: false, errMess: null, accept:false}; 
            case ActionTypes.ADD_REJECT:
            return {...state, isLoading: false, errMess: null,reject:true};
        case ActionTypes.REMOVE_REJECT:
            return {...state,isLoading: false, errMess: null, reject:false}; 
        default:
            return state;
    }
}