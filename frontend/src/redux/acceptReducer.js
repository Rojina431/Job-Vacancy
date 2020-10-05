import * as ActionTypes from './actionTypes';

export const accept = (state = {
        isLoading: true,
        errMess: null,
        accept: null
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_ACCEPT:
            return {...state, isLoading: false, errMess: null, accept: action.payload};
        default:
            return state;
    }
}