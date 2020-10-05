import React,{Component} from 'react';
import { postJob } from '../../../redux/jobAction'
import { connect } from "react-redux";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
  } from "reactstrap";
import {v4 as uuid} from "uuid";
import { FadeTransform} from 'react-animation-components';

class PostJob extends Component{

state={
    msg:"",
    name:"",
    jobRole:"",
    Salary:"",
    CompanyName:"",
}

componentDidUpdate(prevProps) {
        // Check for posting error
      const {error}=this.props;
      if(error!==prevProps.error){
        if(error.id==='POST_FAIL'){
          console.log("Failed");
          alert("Failed")
          //this.setState({msg: error.msg.msg })
        } else {
           console.log("Succed")
           this.setState({ msg: null})
        }
      }
  
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, jobRole,Salary,CompanyName,number } = this.state;
     const jobId=uuid();
    // Create user object
    const newJob = {
        name,
        jobRole,
        Salary,
        CompanyName,
        number,
        jobId
    }
      console.log("hello");
      this.props.postJob(newJob)
      this.setState({ 
        name: "",
        jobRole:"",
        Salary:"",
        CompanyName:"",
        number:"",
       });
      alert("Job Posted")
    };
   
    render(){
    
        return(
          <div className="container  mt-5" style={{width:"500px"}} >
       
          <FadeTransform in 
               transformProps={{
                   exitTransform: 'scale(0.5) translateY(-50%)'
               }}>
                      <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                        <h5 style={{textAlign:"center"}} className="mb-5">Add Jobs</h5> 
                        <Label for="CompanyName">Company Name</Label>
                          <Input
                            type="CompanyName"
                            name="CompanyName"
                            id="CompanyName"
                            value={this.state.CompanyName}
                            className="mb-3"
                            onChange={this.onChange}
                          />
                          <Label for="jobRole">Job Position</Label>
                          <Input
                            type="jobRole"
                            name="jobRole"
                            id="jobRole"
                            value={this.state.jobRole}
                            placeholder="role"
                            className="mb-3"
                            onChange={this.onChange}
                          />
                           <Label for="number">Vacant seats</Label>
                          <Input
                            type="number"
                            name="number"
                            id="number"
                            value={this.state.number}
                            placeholder="number"
                            className="mb-3"
                            onChange={this.onChange}
                          />
                          <Label for="Salary">Salary</Label>
                          <Input
                            type="Salary"
                            name="Salary"
                            id="Salary"
                            value={this.state.Salary}
                            placeholder="Salary"
                            className="mb-3"
                            onChange={this.onChange}
                          />
                          <Label for="name">Author's Name</Label>
                        <Input
                           type="text"
                            name="name"
                            id="name"
                            value={this.state.name}
                            placeholder="Name"
                            className="mb-3"
                            onChange={this.onChange}
                       />
                          <Button color="dark" style={{ marginTop: "2rem" }} block >
                           Add
                          </Button>
                        </FormGroup>
                      </Form>
                      </FadeTransform>
             </div>          
        )
    }
   
}

const mapStateToProps = state => ({
    error:state.error,
    status:state.status
  });
  export default connect(
    mapStateToProps,{postJob}
  )(PostJob);