import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Table} from 'reactstrap';
import { Fade} from 'react-animation-components';

function AcceptPage() {

    const [AcceptedJob, setAcceptedJob] = useState([])

    const variables = {
        userFrom: JSON.parse(localStorage.getItem('creds')) 
    }

    useEffect(() => {
        fetchAccepted();
    }, [])

    const fetchAccepted = () => {
        axios.post('/api/jobs/getAcceptedJob',variables)
        .then(response=> {
            if(response.data.success) {
                 setAcceptedJob(response.data.jobs)
            } else {
                alert(' Failed to get accepted')
            }
        })

    }


    const onClickRemove = (jobId) => {
       const variable = {
            jobId:jobId,
            userFrom: JSON.parse(localStorage.getItem('creds')) 
        }
        axios.post('/api/jobs/removeAccepted',variable)
        .then(response=> {
            if(response.data.success) {
                fetchAccepted();
            } else {
                console.log("hello")
                alert(' Failed to remove from accepted')
            }
        })
    }

    const renderTableBody = AcceptedJob.map((job, index) => {
        return <tr>
            <td>{job.jobRole}</td>
            <td>{job.Salary} $</td>
            <td><button onClick={()=>onClickRemove(job.jobId)}>
                Remove from the Accepted</button></td>
        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }} >
            <h3>Accepted Job</h3>
            <hr />
          <Fade in>
            <Table bordered className="mx-1">
                <thead>
                    <tr>
                        <th>Job Position</th>
                        <th>Salary</th>
                        <th>Remove from accepted</th>
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


export default AcceptPage