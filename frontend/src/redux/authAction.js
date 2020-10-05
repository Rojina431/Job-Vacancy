import * as ActionTypes from './actionTypes';
import axios from 'axios';
import { returnErrors } from './errorAction';
import { returnStatus } from './employee';


//for Employer register

export const registerEmp=({name,email,password})=>(dispatch)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({name,email,password})

    axios.post('/api/usersEmp',body,config)
    .then(res=>{
        localStorage.setItem('token',JSON.stringify(res.data.token));
        localStorage.setItem('creds',JSON.stringify(res.data.user.id));
        localStorage.setItem('status',"Employee");
        dispatch(returnStatus("Employee"));
        dispatch({
        type:ActionTypes.REGISTER_SUCCESS,
        payload:res.data
    })
    
    }).catch(err=>{
        {
        dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'));
        dispatch({type:ActionTypes.REGISTER_FAILED})
    }
    })
}

//for Cand register

export const registerCand=({name,email,password})=>(dispatch)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({name,email,password})

    axios.post('/api/usersCand',body,config)
    .then(res=>{
        localStorage.setItem('token',JSON.stringify(res.data.token));
        localStorage.setItem('creds',JSON.stringify(res.data.user.id))
        localStorage.setItem('status',"Candidate");
        dispatch(returnStatus("Candidate"));
        dispatch({
        type:ActionTypes.REGISTER_SUCCESS,
        payload:res.data
    })
    }).catch(err=>{
        {
        dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'));
        dispatch({type:ActionTypes.REGISTER_FAILED})
    }
    })
}

//for logging in
export const login=({email,password,role})=>(dispatch)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({email,password,role})

    axios.post('/api/auth',body,config)
    .then(res=>{
      
        localStorage.setItem('token',JSON.stringify(res.data.token));
        localStorage.setItem('creds',JSON.stringify(res.data.user.id))
        dispatch({
            type:ActionTypes.LOGIN_SUCCESS,
            payload:res.data
        })
        if(role==="Candidate"){
            dispatch(returnStatus("Candidate"));
            localStorage.setItem('status',"Candidate");
        }else if(role==="Employee"){
            dispatch(returnStatus("Employee"));
            localStorage.setItem('status',"Employee");
        }
    }).catch(err=>{
        if (err.response && err.response.data){
        dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'));
        dispatch({type:ActionTypes.LOGIN_FAILED})
        }else{
            console.log(err)
        }
    })
}


//for user logout

export const logout=()=>{
    return{
        type:ActionTypes.LOGOUT_SUCCESS
    }
}