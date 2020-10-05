import React,{Component,Fragment} from 'react';
import {NavbarToggler,Collapse,Navbar,Nav,NavItem,NavbarBrand} from 'reactstrap';
//import RegisterPage from './registerPage';
//import LoginPage from '../../loginPage';
import Logout from '../../logout';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding} from '@fortawesome/free-solid-svg-icons';
import {Stagger} from 'react-animation-components'
/// ...

export class AppNavbar extends Component{
   state={
       isOpen:false,
       
   }

    toggle=()=>{
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render(){
      const{isAuthenticated}=this.props.auth
      const {status}=this.props
        const authLinks=(
                <Fragment>
                  <NavItem>
                    <span className="navbar-text mr-3">
                    { <h4>{'Welcome'}</h4> }  
                    </span>
                  </NavItem>
                   <NavItem>
                     <Logout/>
                   </NavItem>
                </Fragment>
            )
        
            const guestLinks=(
            <Fragment>
              <NavItem>
                <a href="/registerEmp" style={{color:"white"}}>
                   <span className="fa fa-sign-in fa-lg"></span> Employer Registration
                </a>
              </NavItem>
              <NavItem>
                <a href="/registerCand" style={{color:"white"}} className="ml-4">
                   <span className="fa fa-sign-in fa-lg"></span> Candidates Registration
                </a>
              </NavItem>
              <NavItem>
                <a href="/login" style={{color:"white"}} className="ml-4">
                   <span className="fa fa-sign-in fa-lg"></span> Login
                </a>
              </NavItem>  
            </Fragment>
            )

            const employeeLinks=(
              <Fragment>
                <NavItem >
                    <a href="/posted" style={{color:"white"}} className="ml-4">
                      <span className="fa fa-tasks fa-lg"></span> Posted Job
                    </a>
                </NavItem>
                <NavItem >
                    <a href="/job" style={{color:"white"}} className="ml-4">
                      <span className="fa fa-tasks fa-lg"></span>Add Jobs
                    </a>
                </NavItem>
              </Fragment>
            )

            const candidateLinks=(
              <Fragment>
                <NavItem>
                    <a href="/accepted" style={{color:"white"}} className="ml-4">
                      <span className="fa fa-tasks fa-lg"></span> Accepted Job
                    </a>
                </NavItem>
                <NavItem >
                    <a href="/rejected" style={{color:"white"}} className="ml-4">
                      <span className="fa fa-tasks fa-lg"></span> Rejected Job
                    </a>
                </NavItem>
                <NavItem >
                    <a href="/jobList" style={{color:"white"}} className="ml-4">
                      <span className="fa fa-tasks fa-lg"></span> Received Job
                    </a>
                </NavItem>
              </Fragment>
            )
        return(
             <div>
              <Stagger in>
               <Navbar color="dark" dark expand='sm' > 
                <NavbarBrand href="/"><span><FontAwesomeIcon icon={faBuilding} className="mr-2"/></span>Jobs for Company </NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                     <Nav className="ml-auto mt-2" navbar>
                       {isAuthenticated ? authLinks:guestLinks}
                     </Nav>
                     <Nav className="mr-auto mt-2" navbar>
                      {(status.status==="Candidate")?candidateLinks:(status.status==="Employee")?employeeLinks:""}
                     </Nav>
                    </Collapse>
                </Navbar>
                </Stagger> 
             </div>
        )
    }
}

const mapStateToProps=state=>({
    auth:state.users,
    status:state.status
})

export default connect(mapStateToProps)(AppNavbar);