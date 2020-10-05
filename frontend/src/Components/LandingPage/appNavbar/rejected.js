import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Table} from 'reactstrap';
import { Fade} from 'react-animation-components';

function RejectedPage() {

    const [RejectedJob, setRejectedJob] = useState([])

    const variables = {
        userFrom: JSON.parse(localStorage.getItem('creds')) 
    }

    useEffect(() => {
        fetchRejected();
    }, [])

    const fetchRejected = () => {
        axios.post('/api/jobs/getRejectedJob',variables)
        .then(response=> {
            if(response.data.success) {
                 setRejectedJob(response.data.jobs)
            } else {
                alert(' Failed to get Rejected')
            }
        })

    }


    const onClickRemove = (jobId) => {
       const variable = {
            jobId:jobId,
            userFrom: JSON.parse(localStorage.getItem('creds')) 
        }
        axios.post('/api/jobs/removeRejected',variable)
        .then(response=> {
            if(response.data.success) {
                fetchRejected();
            } else {
                console.log("hello")
                alert(' Failed to remove from Rejected')
            }
        })
    }

    const renderTableBody = RejectedJob.map((job, index) => {
        return <tr>
            <td>{job.jobRole}</td>
            <td>{job.Salary} $</td>
            <td><button onClick={()=>onClickRemove(job.jobId)}>
                Remove from the Rejected</button></td>
        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }} >
            <h3>Rejected Job</h3>
            <hr />
          <Fade in>
            <Table bordered className="mx-1">
                <thead>
                    <tr>
                        <th>Job Position</th>
                        <th>Salary</th>
                        <th>Remove from Rejected</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody}
                </tbody>
            </Table>
            </Fade>
        </div>
    )
}


export default RejectedPage