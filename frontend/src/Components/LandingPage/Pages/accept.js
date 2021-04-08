import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from 'reactstrap';
import { postFavorite,removeFavorite } from '../../../redux/acceptAction'
import { connect ,useSelector} from "react-redux"; 

function Accept(props) {
    
    const [Accepted, setAccepted] = useState(props.accept)
    const rejected=useSelector(state=>state.accept.reject)
    const variables = {
        jobRole:props.jobRole,
        name:props.name,
        Salary:props.Salary,
        Company:props.Company,
        number:props.number,
        userFrom: JSON.parse(localStorage.getItem('creds')), 
        jobId:props.id
    }
   const variable={
    userFrom: JSON.parse(localStorage.getItem('creds')), 
    jobId:props.id   
   }

    useEffect(() => {
        axios.post('/api/jobs/Accepted', variable)
            .then(response => {
                if (response.data.success) {
                    setAccepted(response.data.accepted)
                } else {
                    alert('Failed to get accept Information')
                }
            })
    }, [])

    const onClickAccept = () => {

        if (Accepted) {
            
            axios.post('/api/jobs/removeAccepted', (variables))
                .then(response => {
                    if (response.data.success) {
                        setAccepted(!Accepted)
                        props.removeFavorite(!Accepted);
                        localStorage.setItem('accept',null)
                    } else {
                        alert('Failed to Remove From Accepted')
                    }
                }).catch(err=>{
                    alert(err.msg)
                })
            }
         else{
           if(!rejected){
            axios.post('/api/jobs/addToAccepted', (variables))
            .then(response => {
                if (response.data.success) {
                    setAccepted(!Accepted)
                    props.postFavorite(!Accepted)
                    localStorage.setItem('accept',variables.userFrom)
                    localStorage.setItem('reject',null)
                    console.log(props.accept)
                } else {
                    alert('Failed to Add To Accepted')
                }
            }).catch(err=>{
                alert(err.msg)
            })
           }else{
              alert("Remove from rejected to accept!") 
           }
        }     
        }
 

    return (
        
            <Button onClick={onClickAccept} className="m-2" > {!Accepted ? "Add to Accepted" : "Remove from Accepted"}</Button>
       
    )
}

const mapStateToProps = state => ({
    accept:state.accept.accept,
  });
  export default connect(
    mapStateToProps,{removeFavorite,postFavorite}
  )(Accept)