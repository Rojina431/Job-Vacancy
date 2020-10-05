import React,{Component,Fragment} from 'react';
import {NavLink} from 'reactstrap';
import {connect} from 'react-redux';
import {logout} from '../redux/authAction';
class Logout extends Component{

    render(){
        return(
            <Fragment>
              <NavLink  onClick={this.props.logout} style={{color:'white'}} href="/">
              <span className="fa fa-sign-out fa-lg"></span> Logout</NavLink>
            </Fragment>
            
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.users.isAuthenticated,
  });


export default connect((mapStateToProps),{logout})(Logout);