import * as ActionTypes from './actionTypes';
import axios from 'axios';
import { returnErrors } from './errorAction';


//for posting vacant position
export const postJob=({name,jobRole,Salary,CompanyName,number,jobId})=>(dispatch)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const userFrom=JSON.parse(localStorage.getItem('creds'))
    const body=JSON.stringify({name,jobRole,Salary,CompanyName,number,userFrom,jobId})

    axios.post('/api/jobs/postJob',body,config)
    
    .then(res=>{
        dispatch({
        type:ActionTypes.POST_SUCCESS,
        payload:res.data
    })
    
    }).catch(err=>{
        {
        dispatch(returnErrors(err.response.data,err.response.status,'POST_FAIL'));
    }
    })
}

