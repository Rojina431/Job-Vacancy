import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Row} from 'reactstrap';
import GridImage from './cardJob';
import { Fade} from 'react-animation-components';
import './search.css';


function JobPage() {

    const [Job, setJob] = useState([])
    const [search,setSearch]=useState([])
    const [error,setError]=useState(false)

    useEffect(() => {
        fetchPostedJob();

}, [])


    const fetchPostedJob = () => {
        var token=JSON.parse(localStorage.getItem('token'));

       const url='/api/jobs/getJobList'
        axios.post('/api/jobs/getJobList',{}, {headers:{"Authorization":'Bearer'+' '+token}})
        .then(response => {
            if (response.data.success) {
                localStorage.setItem("Job",JSON.stringify(response.data.jobs))
                setJob(response.data.jobs)
            } else {
                alert('Failed to get posted job')
            }
        }).catch((err)=>{
            setError(true)
        })
    }

    function Search(job){
       return job.filter((job)=>job.jobRole.toLowerCase().indexOf(search)>-1);
    }

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
}

export default JobPage