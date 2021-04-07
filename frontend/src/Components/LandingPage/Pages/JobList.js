import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Row} from 'reactstrap';
import GridImage from './cardJob';
import { Fade} from 'react-animation-components';
import './search.css';
import { shallowEqual,useDispatch,useSelector} from 'react-redux'
import {jobList} from '../../../redux/jobAction'
import { Redirect } from 'react-router';

function JobPage() {

    const dispatch=useDispatch()
    const Job=useSelector(state=>state.job.jobs)
    const { isAuthenticated, status } = useSelector(state => ({
        isAuthenticated: state.users,
        status: state.status,
      }), shallowEqual);
    const [search,setSearch]=useState([])
    const [redirect,setRedirect]=useState([false])
    const [error,setError]=useState(false);
   

    useEffect(() => {
        fetchPostedJob();
        Direct();
}, [])

const  Direct=()=>{
    if(isAuthenticated){
        if(status.status==="Candidate"){
            setRedirect(true)
        }else{
            setRedirect(false) ;
         }
    }else{
       setRedirect(false) ;
    }
}

    const fetchPostedJob = () => {
      dispatch(jobList())
    }

    function Search(job){
       return job.filter((job)=>job.jobRole.toLowerCase().indexOf(search)>-1);
    }

    if(redirect){
    return (

        <div style={{ width: '85%', margin: '3rem auto' }}>
            <div className="container mb-5" >
            <label for="search">
                <input type="search"  placeholder="Search Jobs" value={search}
                onChange={(e)=>setSearch(e.target.value)}/>
                <button type="submit" style={{border: '2px solid #ccc' ,float:'left'}}><i class="fa fa-search"></i></button>
            </label>
            </div>
            <h3>Job Vacancy</h3>
            <hr />
           <Fade in>
            <Row gutter={[16, 16]} >
                      {Job[0]?Search(Job).map((job, index) => (
                            <React.Fragment key={index}>
                                <GridImage
                                    company={job.CompanyName}
                                    jobRole={job.jobRole}
                                    jobSalary={job.Salary}
                                    id={job._id}
                                />
                            </React.Fragment>
                        )):(error)?<div>Login to get job list ....</div>:<div>Loading....</div>}
                </Row>
               </Fade> 
        </div>
    )
                      }else{
                          return(
                              <Redirect to='/login'/>
                          )
                      }
                      }


export default (JobPage)