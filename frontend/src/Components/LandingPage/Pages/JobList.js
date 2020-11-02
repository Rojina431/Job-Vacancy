import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Row} from 'reactstrap';
//import { faBusinessTime} from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GridImage from './cardJob';
import { Fade} from 'react-animation-components';
import './search.css';


function JobPage() {

    const [Job, setJob] = useState([])
    const [search,setSearch]=useState([])
 
    useEffect(() => {
        fetchPostedJob();

}, [])


    const fetchPostedJob = () => {
        axios.post('/api/jobs/getJobList')
        .then(response => {
            if (response.data.success) {
                localStorage.setItem("Job",JSON.stringify(response.data.jobs))
                setJob(response.data.jobs)
            } else {
                alert('Failed to get posted job')
            }
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
                      {Search(Job).map((job, index) => (
                            <React.Fragment key={index}>
                                <GridImage
                                    company={job.CompanyName}
                                    jobRole={job.jobRole}
                                    jobSalary={job.Salary}
                                    id={job._id}
                                />
                            </React.Fragment>
                        ))}
                </Row>
               </Fade> 
        </div>
    )
}

export default JobPage