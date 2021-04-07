import React,{useState,useEffect} from 'react';
import Loginpage from './loginPage';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import CandRegisterPage from './LandingPage/appNavbar/registrationPage/candidate';
import EmpRegisterPage from './LandingPage/appNavbar/registrationPage/employer';
import PostJob from './LandingPage/Pages/postJob';
import JobPage from './LandingPage/Pages/JobList';
import JobDetail from './LandingPage/Pages/jobDetail';
import AcceptPage from './LandingPage/appNavbar/accepted';
import RejectedPage from './LandingPage/appNavbar/rejected';
import PostedPage from './LandingPage/appNavbar/posted';
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios';
import LandingPage from './LandingPage/landing';
import {jobList} from '../redux/jobAction'

function MainPage() {
//const [Job,setJob]=useState([props.job.jobs])

const Job=useSelector(state=>state.job.jobs)
const dispatch=useDispatch()
console.log(Job)
useEffect(()=>{
  //fetchClickedJob();
  dispatch(jobList())
  
},[])  
 
/*const fetchClickedJob = () => {
  axios.post('/api/jobs/getJobList')
  .then(response => {
      if (response.data.success) {
          setJob(response.data.jobs)
      } else {
          alert('Failed to get posted job')
      }
  }).catch(err=>{
    console.log(err)
  })
}*/

const JobWithId=({match})=>{

  console.log(match.params.jobId)
  return(
    <React.Fragment>
   <JobDetail job={Job.filter((job)=>job._id===match.params.jobId)} />
   </React.Fragment>
  )
}

  return (
      <div>
       <BrowserRouter>
           <Switch>
             <Route exact path='/'><LandingPage/></Route>
             <Route exact path='/login'><Loginpage/></Route>
             <Route exact path='/registerEmp'><EmpRegisterPage/></Route>
             <Route exact path='/registerCand'><CandRegisterPage/></Route>
             <Route exact path='/job' ><PostJob/></Route>
             <Route exact path='/jobList' ><JobPage/></Route>
             <Route exact path='/job/:jobId' component={JobWithId}/> 
             <Route exact path='/posted' component={()=><PostedPage/>} />
             <Route exact path='/accepted' component={()=><AcceptPage/>}/>
             <Route exact path='/rejected' component={()=><RejectedPage/>} />
           </Switch>
       </BrowserRouter>
    </div>

   
  );
}
export default MainPage;