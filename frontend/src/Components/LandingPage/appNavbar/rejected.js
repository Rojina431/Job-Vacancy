import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Table} from 'reactstrap';
import { Fade} from 'react-animation-components';
import { removeRejected } from '../../../redux/acceptAction'
import { connect } from "react-redux";
import { Redirect } from 'react-router';

function RejectedPage(props) {

    const { isAuthenticated, status } = props

    const [redirect,setRedirect]=useState([false])
    const [RejectedJob, setRejectedJob] = useState([])
    const [r,setr]=useState(props.reject)

    const variables = {
        userFrom: JSON.parse(localStorage.getItem('creds')) 
    }

    useEffect(() => {
        fetchRejected();
        Direct();
    }, [])
    
    const  Direct=()=>{
        if(isAuthenticated){
            if(status==="Candidate"){
                setRedirect(true)
            }else{
                setRedirect(false) ;
             }
        }else{
           setRedirect(false) ;
        }
    }  

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
                props.removeRejected(!r);
                localStorage.setItem('reject',null)
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

    if(redirect){
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
    )}else{
        return(
            <Redirect to='/login'/>
        )
    }
}


const mapStateToProps = state => ({
    reject:state.accept.reject,
    isAuthenticated: state.users.isAuthenticated,
    status: state.status.status,
  });
  export default connect(
    mapStateToProps,{removeRejected}
  ) (RejectedPage)