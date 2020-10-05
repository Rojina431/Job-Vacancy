import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Row} from 'reactstrap';
//import { faBusinessTime} from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GridImage from './cardJob';
import { Fade} from 'react-animation-components';


function JobPage() {

    const [Job, setJob] = useState([])
 
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

    return (
       
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h3>Job Vacancy</h3>
            <hr />
           <Fade in>
            <Row gutter={[16, 16]} >
                      {Job.map((job, index) => (
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