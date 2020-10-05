import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from 'reactstrap';
 

function Reject(props) {

    const [Rejected, setRejected] = useState(false)
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

    }, [])

    const onClickReject = () => {

        if (Rejected) {
            axios.post('/api/jobs/removeRejected', variables)
                .then(response => {
                    if (response.data.success) {
                        setRejected(!Rejected)
                    } else {
                        alert('Failed to Remove From Rejected')
                    }
                }).catch(err=>{
                    alert(err.msg)
                })
            }
         else{
        
            axios.post('/api/jobs/addToRejected', variables)
            .then(response => {
                if (response.data.success) {
                    setRejected(!Rejected)
                } else {
                    alert('Failed to Add To Rejected')
                }
            }).catch(err=>{
                alert(err.msg)
            })
        }     
        }
 

    return (
        
            <Button onClick={onClickReject} className="m-2" > {!Rejected ? "Add to Rejected" : "Remove from Rejected"}</Button>
       
    )
}

export default Reject

