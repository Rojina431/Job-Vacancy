import * as ActionTypes from './actionTypes';

const initialState={
    job:localStorage.getItem("Jobs"),
    isLoading:true
}

export default function(state=initialState,action){
    switch(action.type){
            case ActionTypes.POST_SUCCESS:   
                return{
                    ...state,
                   job:action.payload,
                    isLoading:false,
                }             
            default:
                return state;             
    }
}
