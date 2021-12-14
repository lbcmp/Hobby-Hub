import React from 'react';
import './login.css';
import { AuthContext } from '../context/AuthContext';
import { Redirect, useHistory } from 'react-router-dom';
import HomePage from './HomePage';

class LoginPage extends React.Component {
  state = {
    // redirectToReferrer: false,
    failed: false,
    email: '',
    pwd: '',
  }

  fieldChanged = (name) => {
    return (event) => {
      let { value } = event.target;
      this.setState({ [name]: value });
    }
  }

  login = (e) => {
    this.props.login();
    e.preventDefault();
    // const auth = this.context;
    // let { email, password } = this.state;
    // auth.authenticate(email, password)
    //   .then((user) => {
    //     this.setState({ redirectToReferrer: true });
    //   })
    //   .catch((err) => {
    //     this.setState({ failed: true });
    //   });
  }


  // handleChange = (e) =>{
  //     const {name,value} = e.target
  //     this.setState({[name]:value})
  // }

  // handleSubmit = (e) =>{
  //     e.preventDefault()
  //     this.props.isLogin(true)
  // }
  render() {
    
      // const {from} = this.props.location.state || {from: {pathname: '/' } };
      const {redirectToReferrer, failed} = this.state;
      const {loggedIn} = this.props;

      // if (redirectToReferrer) {
      // return <Redirect to={from} />;
      // }

      if (loggedIn) {
      return <Redirect to={"/home"} />;
      }

      let err="";
      if (failed) {
        err = <div className="alert alert-danger" role="alert">Login Failed</div>;
      }

      return(
      <div className='div-login rounded'>
        <div>
          {err}
          {/* <form onSubmit={this.login}> */}
            <p className="HH-font">Hobbies Hub</p>
            <input className="rounded" type='email' name='email' placeholder='Username' required onChange={this.fieldChanged('email')} />
            <input className="rounded" type='password' name='pwd' placeholder='Password' required onChange={this.fieldChanged('password')} />
            <div className="moveLoginDown">
            <button className="btn btn-primary loginButton" onClick={this.login}>Log In</button>
            <p className="sign-up-font"> <br/>Don't have an account?<a href="/signup"> Sign up here</a></p>
            </div>
          {/* </form> */}
        </div>
      </div>
      )
     
  }

}

LoginPage.contextType = AuthContext

export default LoginPage;