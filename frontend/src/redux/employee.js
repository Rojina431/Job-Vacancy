import * as ActionTypes from './actionTypes';

export const returnStatus=(status=null)=>{
   return{
       type:ActionTypes.STATUS,
       payload:{status}
   }
}



