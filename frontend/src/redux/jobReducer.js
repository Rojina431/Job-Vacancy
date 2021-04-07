import * as ActionTypes from './actionTypes';

const initialState={
    job:localStorage.getItem("Jobs"),
    isLoading:true,
    jobs:[]
}

export default function(state=initialState,action){
    switch(action.type){
            case ActionTypes.POST_SUCCESS:   
                return{
                    ...state,
                   job:action.payload,
                    isLoading:false,
                }  
            case ActionTypes.GET_JOB:
                const getJob=action.payload
                console.log(getJob)
                return{
                    ...state,
                    jobs:getJob,
                    isLoading:false
                } 
            case ActionTypes.GET_ERROR:
                return{
                    ...state,
                    jobs:[],
                    isLoading:true,
                }                  
            default:
                return state;             
    }
}
