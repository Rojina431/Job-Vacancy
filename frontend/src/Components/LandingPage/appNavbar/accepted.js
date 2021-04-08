import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Table} from 'reactstrap';
import { Fade} from 'react-animation-components';
import { removeFavorite } from '../../../redux/acceptAction'
import { connect } from "react-redux"; 
import { Redirect } from 'react-router';

function AcceptPage(props) {

    const { isAuthenticated, status } = props

    const [redirect,setRedirect]=useState([false])
    const [AcceptedJob, setAcceptedJob] = useState([])
    const [a,seta]=useState(props.accept)
    const variables = {
        userFrom: JSON.parse(localStorage.getItem('creds')) 
    }

    useEffect(() => {
        fetchAccepted();
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
                console.log(props.accept)
                props.removeFavorite(!a);
                localStorage.setItem('accept',null)
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
if(redirect){
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
    )}else{
        return(
            <Redirect to='/login'/>
        )
    }
}


const mapStateToProps = state => ({
    accept:state.accept.accept,
    isAuthenticated: state.users.isAuthenticated,
    status: state.status.status,
  });
  export default connect(
    mapStateToProps,{removeFavorite}
  )(AcceptPage)