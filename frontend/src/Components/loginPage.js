import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from '../redux/authAction'
import { clearErrors } from '../redux/errorAction'
import { Redirect } from "react-router-dom";
import {v4 as uuid} from 'uuid';
import { FadeTransform} from 'react-animation-components';

class LoginPage extends Component {
  state = {
    modal: false,
    email: "",
    password: "",
    role:"",
    msg: null,
    
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    returnErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const {error} = this.props;
    if(error !== prevProps.error) {
        // Check for register error
        if(error.id==='LOGIN_FAIL'){
          
          this.setState({msg: error.msg.msg })
        } else {
          
            this.setState({ msg: null ,isAuthenticated:true})
        }
    }
  }


  onChange = e => {
    
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    
    const {  email, password ,role} = this.state;
    const id=uuid();
    // Create user object
    const User = {
        email,
        password,
        role,
        id
    };

    // Attempt to register
    this.props.login(User)

  };

  render() {
    if(this.props.status.status==="Employee"){
      return <Redirect to='/job'/>
    }else if(this.props.status.status==="Candidate"){
     return <Redirect to='/jobList'/>
    }
    return (
      <div className="container  mt-5" style={{width:"500px"}} >
       
           <FadeTransform in 
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
               <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <h5 style={{textAlign:"center"}} className="mb-5">Login</h5> 
                {this.state.msg ? (<Alert color="danger">{ this.state.msg }</Alert>) : null} 
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="role">Role</Label>
                <Input
                  type="role"
                  name="role"
                  id="role"
                  placeholder="Employee/Candidate"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Button  style={{ marginTop: "2rem" , color:"whitesmoke"}} block>
                 Login
                </Button>
              </FormGroup>
            </Form>
            </FadeTransform> 
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
  error: state.error,
  status:state.status
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(LoginPage);