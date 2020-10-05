import React from 'react';
import {Col,Card,CardText} from 'reactstrap';
import { Fade} from 'react-animation-components';
var Link = require('react-router-dom').Link;


export default function GridImage(props){

    return(
      <Col lg={6} md={8} xs={24} className="mb-2">
        <div style={{position:'relative'}}>
          <Link to={`/job/${props.id}`}>
          <Fade in>
              <Card style={{backgroundColor:"lightgrey"}} >
                  <CardText style={{color:"black",textAlign:"center"}} >Vacancy for {props.jobRole}</CardText>
              </Card>
            </Fade>
          </Link>
         </div>   
      </Col>   
       
    )
  }