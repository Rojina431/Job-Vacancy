import React from 'react';
import MainImage from './MainPage';

 function JobDetail(props){

   const Job=props.job
   console.log(Job);
    return(
      
        <React.Fragment>
            <div style={{ width: '100%', margin: 0 }}>
              {Job.map((job)=>(
                      <MainImage jobRole={job.jobRole} number={job.number}
                      Salary={job.Salary} Company={job.CompanyName} name={job.name} 
                      id={job.jobId}/>
              ))}
            </div>
             <br/>     
        </React.Fragment>
 )}



    export default JobDetail