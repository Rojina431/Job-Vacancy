import React from 'react'
import {Card,CardText,CardTitle, CardBody} from 'reactstrap'
import Accept from './accept';
import Reject from './reject';

function MainImage(props){
    console.log(props.jobRole)
    return(
        
        <div  style={{width:'100%'}} className="m-1" >
        <Card style={{backgroundColor:"lightgrey"}}>
              <CardTitle style={{color:"black",textAlign:"center",textDecorationLine:"underline"}} ><h5>Vacancy for {props.Company} company.</h5></CardTitle>
              <CardBody>
                 <CardText style={{color:"black",textAlign:"center"}}><h5>Job Position: {props.jobRole}</h5></CardText>
                 <CardText style={{color:"black",textAlign:"center"}}><h5>Vacant Seats: {props.number}</h5></CardText>
                 <CardText style={{color:"black",textAlign:"center"}}><h5>Salary: {props.Salary}</h5></CardText>
                 <CardText style={{color:"black",textAlign:"center"}}><p>Posted by: {props.name}</p></CardText>
              </CardBody>
        </Card>
        
        <div>
           <Accept jobRole={props.jobRole} name={props.name} id={props.id} Salary={props.Salary} Company={props.Company} number={props.number} />
           <Reject jobRole={props.jobRole} name={props.name} id={props.id} Salary={props.Salary} Company={props.Company} number={props.number} />
       </div>
      </div>
    )
}

export default (MainImage)

