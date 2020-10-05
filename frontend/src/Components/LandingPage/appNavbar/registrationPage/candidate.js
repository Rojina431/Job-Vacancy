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
import { registerCand } from '../../../../redux/authAction'
import { clearErrors } from '../../../../redux/errorAction'
import { Redirect } from "react-router-dom";
import { FadeTransform} from 'react-animation-components';

class CandRegisterPage extends Component {
  state = {
    modal: false,
    name:"",
    email: "",
    password: "",
    msg: null,
    Status:this.props.status
   
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
        if(error.id==='REGISTER_FAIL'){
          
          this.setState({msg: error.msg.msg })
        } else {
          
            this.setState({ msg: null ,isAuthenticated:true,Status:"Candidate"})
        }
    }
  }

  onChange = e => {
    
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    
    const { name, email, password } = this.state;

    // Create user object
    const newUser = {
        name,
        email,
        password
    };

    // Attempt to register
    this.props.registerCand(newUser)
    this.setState({Status:"Candidate"})
  

  };

  render() {
    const {status}=this.props
    if(status.status==="Candidate"){
      return(
        <Redirect to="/jobList"/>
      )
    }
    return (
      <div className="container  mt-5 " style={{width:"500px"}} >
              <FadeTransform in 
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
              <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <h5 style={{textAlign:"center"}} className="mb-5">Register as a Candidate</h5> 
                {this.state.msg ? (<Alert color="danger">{ this.state.msg }</Alert>) : null} 
                <Label for="name">Name</Label>
                <Input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="name"
                  className="mb-3"
                  onChange={this.onChange}
                />
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
  { registerCand, clearErrors }
)(CandRegisterPage);