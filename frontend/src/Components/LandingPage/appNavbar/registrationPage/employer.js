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
import { registerEmp } from '../../../../redux/authAction'
import { clearErrors } from '../../../../redux/errorAction'
import PostJob from "../../Pages/postJob";
import { FadeTransform } from 'react-animation-components';

class EmpRegisterPage extends Component {
   
  state = {
    name:"",
    email: "",
    password: "",
    msg: null,
    isAuthenticated:this.props.status
    
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired,
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
          
            this.setState({ msg: null ,isAuthenticated:true,Status:"Employee"})

        }
    }
    
  }
  

  onChange = e => {
    
    this.setState({ [e.target.name]: e.target.value });
  };

    onSubmit= (e) =>{
    e.preventDefault();
    
    const { name, email, password } = this.state;

    // Create user object
    const newUser = {
        name,
        email,
        password
    };

    // Attempt to register
   
  this.props.registerEmp(newUser);
  console.log("hello");
  this.setState({isAuthenticated:true})
  };

  

  render() {
   const {status}=this.props
    if(status.status==="Employee"){
      return (
        <PostJob status={"Employee"} />
      )
    }
    return (
      <div className="container  mt-5" style={{width:"500px"}} >
               <FadeTransform in 
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
               <Form onSubmit={
                 this.onSubmit}>
              <FormGroup>
                <h5 style={{textAlign:"center"}} className="mb-5">Register as a Employer</h5> 
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
                <Button  style={{ marginTop: "2rem" , color:"whitesmoke"}} block  >
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
  { registerEmp, clearErrors }
)(EmpRegisterPage);