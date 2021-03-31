import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from 'reactstrap';
import { postRejected,removeRejected } from '../../../redux/acceptAction'
import { connect } from "react-redux"; 

function Reject(props) {

    const [Rejected, setRejected] = useState(props.reject)
    const [accepted,setaccepted]=useState(props.accept)
    const variables = {
        jobRole:props.jobRole,
        name:props.name,
        Salary:props.Salary,
        Company:props.Company,
        number:props.number,
        jobId:props.id,
        userFrom: JSON.parse(localStorage.getItem('creds')), 
    }

    useEffect(() => {
        axios.post('/api/jobs/rejected', variables)
            .then(response => {
                if (response.data.success) {
                    setRejected(response.data.rejected)
                } else {
                    alert('Failed to get Rejected Information')
                }
            })
            console.log(Rejected)
            console.log(accepted)

    }, [])

    const onClickReject = () => {

        if (Rejected) {
            axios.post('/api/jobs/removeRejected', variables)
                .then(response => {
                    if (response.data.success) {
                        setRejected(!Rejected)
                        props.removeRejected(!Rejected);
                        localStorage.setItem('reject',null)
                    } else {
                        alert('Failed to Remove From Rejected')
                    }
                }).catch(err=>{
                    alert(err.msg)
                })
            }
         else{
            if(!accepted){
                console.log(accepted)
                axios.post('/api/jobs/addToRejected', variables)
            .then(response => {
                if (response.data.success) {
                    setRejected(!Rejected)
                    props.postRejected(!Rejected)
                    localStorage.setItem('reject',variables.userFrom)
                    localStorage.setItem('accept',null)
                } else {
                    alert('Failed to Add To Rejected')
                }
            }).catch(err=>{
                alert(err.msg)
            })
            }else{
                alert("Remove from accepted to reject!")
            }
        }     
        }
 

    return (
        
            <Button onClick={onClickReject} className="m-2" > {!Rejected ? "Add to Rejected" : "Remove from Rejected"}</Button>
       
    )
}

const mapStateToProps = state => ({
    accept:state.accept.accept,
    reject:state.accept.reject
  });
  export default connect(
    mapStateToProps,{postRejected,removeRejected}
  ) (Reject)

