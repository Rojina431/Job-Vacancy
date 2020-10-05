import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Table} from 'reactstrap';
import '../../../App.css'
import { Fade} from 'react-animation-components';

function PostedPage() {

   const variable = { 
       userFrom: JSON.parse(localStorage.getItem('creds')) 
    }

    const [PostedJob, setPostedJob] = useState([])

    useEffect(() => {
        fetchPosted();
    }, [])

    const fetchPosted = () => {
        axios.post('/api/jobs/getPostedJob',variable)
        .then(response=> {
            if(response.data.success) {
                 setPostedJob(response.data.jobs)
            } else {
                alert(' Failed to get posted')
            }
        })
    }

    const onClickRemove = (jobId) => {
        
        const variable = {
            jobId:jobId,
            userFrom: JSON.parse(localStorage.getItem('creds'))
        }

        axios.post('/api/jobs/removePosted', variable)
        .then(response=> {
            if(response.data.success) {
                fetchPosted();

            } else {
                alert(' Failed to remove from posted')
            }
        })

    }

    const renderTableBody = PostedJob.map((job, index) => {
        return <tr >
            <td>{job.jobRole}</td>
            <td>{job.Salary} $</td>
            <td><button onClick={()=>onClickRemove(job.jobId)}>
                Remove from the posted</button></td>
        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h3>Posted Job</h3>
            <hr />
             <Fade in>
            <Table bordered  className="mx-1 Table" >
                <thead>
                    <tr>
                        <th>Job Position</th>
                        <th>Salary</th>
                        <th>Remove from posted</th>
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


export default PostedPage


