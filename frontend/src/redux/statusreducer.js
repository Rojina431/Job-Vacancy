import * as ActionTypes from './actionTypes';

const initialState={
    status:(localStorage.getItem('status')==="Candidate")?"Candidate":(localStorage.getItem('status')==="Employee")?"Employee":null,
}

export default function(state=initialState,action){
   switch(action.type){
       case ActionTypes.STATUS:
           return{
               ...state,
               status:action.payload.status,
              
           }
          
        default:
            return state;    
   }
}