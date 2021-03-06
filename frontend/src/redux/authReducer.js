import * as ActionTypes from './actionTypes';

const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:localStorage.getItem('token')?true:false,
    isLoading:false,
    user:localStorage.getItem('creds')?localStorage.getItem('creds'):null
}

export default function(state=initialState,action){
    switch(action.type){
            case ActionTypes.LOGIN_SUCCESS:
            case ActionTypes.REGISTER_SUCCESS:
                return{
                    ...state,
                   ...action.payload,
                    isAuthenticated:true,
                    isLoading:false,
                }  
            case ActionTypes.LOGIN_FAILED:
            case ActionTypes.REGISTER_FAILED:
            case ActionTypes.LOGOUT_SUCCESS:
                localStorage.removeItem('token')
                localStorage.removeItem('creds')
                localStorage.removeItem('user')
                localStorage.removeItem('status')
                return{
                    token:null,
                    isAuthenticated:false,
                    isLoading:false,
                    user:null
                }            
            default:
                return state;             
    }
}
