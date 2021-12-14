import React from 'react';
import './signup.css';
import { AuthContext } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';
class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    fname: '',
    lname: '',
    username: '',
  }

  // handleChange = (e) =>{
  //     const {name,value} = e.target
  //     this.setState({[name]:value})
  // }

  fieldChanged = (name) => {
    return (event) => {
      let { value } = event.target;
      this.setState({ [name]: value });
    }
  }


  //on submit
  signup = (e) => {
    this.props.login();
    e.preventDefault();

    let { username, fname, lname, email, password } = this.state;

    fetch("/api/user/", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        firstName: fname,
        lastName: lname,
        dob: null,
        gender: null,
        email: email,
        password: password
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        throw new Error('Content validation');
      })
      .then(user => {
        this.setState({
          success: true,
        });
      })
      .catch(err => {
        this.setState({
          error: true,
        });
      });


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
  render() {
    // const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer, failed } = this.state;
    const {loggedIn} = this.props;

    // if (redirectToReferrer) {
    //   return <Redirect to={from} />;
    // }

    if (loggedIn) {
      return <Redirect to={"/home"} />;
    }

    let err = "";
    if (failed) {
      err = <div className="alert alert-danger" role="alert">Login Failed</div>;
    }
    return (
      <div className='div-signup rounded'>
        {err}
        <div>
          {/* <form onSubmit={this.signup}> */}
          <p className="header-font">Hobbies Hub</p>
          <input className='input rounded' type='fname' name='fname' placeholder='First Name' required onChange={this.fieldChanged('fname')} />
          <input className='input rounded' type='lname' name='lname' placeholder='Last Name' required onChange={this.fieldChanged('lname')} />
          <input className='input rounded' type='email' name='email' placeholder='Email' required onChange={this.fieldChanged('email')} />
          <input className='input rounded' type='uemail' name='username' placeholder='Username' required onChange={this.fieldChanged('username')} />
          <input className='input rounded' type='password' name='password' placeholder='Password' required onChange={this.fieldChanged('password')} />
          <p className="hobby-option">Choose a Hobby:</p>
          <div className="hobbies">
            <button className='button chooseButton' onClick={() => ""}>Art</button>
            <button className='button chooseButton' onClick={() => ""}>Interior Design</button>
          </div>
          <div className="list">
            <input className='list' type='checkbox' name='checkbox' value='I have a bike' />
            <p>I have a bike</p>
          </div>
          <button className='button signButton' onClick={this.signup}>Sign Up</button>
          {/* </form> */}
        </div>
      </div>
    )
  }
}
SignUp.contextType = AuthContext
export default SignUp;