import React from 'react';
import './signup.css';
import { AuthContext } from '../context/AuthContext';
import { Link, Redirect } from 'react-router-dom';

class SignUp extends React.Component {
  state = {
    username: '',
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    hobby: '',
    success: false,
    error: false,
    redirect: null
  }

  fieldChanged = (name) => {
    return (event) => {
      let { value } = event.target;
      this.setState({ [name]: value });
    }
  }

  validateInput = async() => {
    let {username, firstName, lastName, age, gender, email, password, hobby} = this.state;
    let errorExists = false;

    Array.from(document.getElementsByClassName("error")).forEach((e) => {
      e.innerHTML = ''
    });

    if (username.length < 5) {
      document.getElementById('username').innerHTML = 'Username should be at least 5 characters long.'
      errorExists = true;
    } if (firstName.length < 2) {
      document.getElementById('first-name').innerHTML = 'First name should be at least 2 characters long.'
      errorExists = true;
    } if (lastName.length < 2) {
      document.getElementById('last-name').innerHTML = 'Last name should be at least 2 characters long.'
      errorExists = true;
    } if (age < 13 || age > 120) {
      document.getElementById('age').innerHTML = 'Age should be in this range: 13 to 120.'
      errorExists = true;
    } if (gender === '') {
      document.getElementById('gender').innerHTML = 'Please select a gender.'
      errorExists = true;
    } if (email.length < 5) {
      document.getElementById('email').innerHTML = 'Email should be at least 5 characters long.'
      errorExists = true;
    } if (password.length < 7) {
      document.getElementById('password').innerHTML = 'Password should be at least 7 characters long.'
      errorExists = true;
    } if (hobby === '') {
      document.getElementById('hobby').innerHTML = 'Please select a hobby.'
      errorExists = true;
    }

    let duplicateInformation = undefined;

    await fetch("/api/user/" + username + '/' + email)
    .then(res => res.json())
    .then(dI => {
      duplicateInformation = dI;

      if (duplicateInformation.duplicateUsername) {
        document.getElementById('username').innerHTML = 'Username already exists.'
        errorExists = true;
      } if (duplicateInformation.duplicateEmail) {
        document.getElementById('email').innerHTML = 'Email is already in use.'
        errorExists = true;
      }
    })
    .catch(e => console.log(e))

    if (!errorExists) {
      return true;
    } else {
      return false;
    }
  }

  //on submit
  signup = (e) => {
    e.preventDefault();

    this.validateInput()
    .then((submitForm) => {
      if (submitForm) {
      // this.props.login();

      fetch("/api/user/", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          age: this.state.age,
          gender: this.state.gender,
          email: this.state.email,
          password: this.state.password
        }),
      })
      .then(res => {
        if (res.ok) {
          this.setState({redirect: true})
        } else {
          this.setState({error: true})
        }
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
      }
    })
    .catch((e) => {
      console.log(e)
    })

      // const auth = this.context;
      // let { email, password } = this.state;
      // auth.authenticate(email, password)
      //   .then((user) => {
      //     this.setState({ redirectToReferrer: true });
      //   })
      //   .catch((err) => {
      //     this.setState({ failed: true });
      //   });
    // }
  }

  hobbyButtonPressed = (hobby) => {
    if (hobby === 'art') {
      this.setState({hobby: "art"});
      document.getElementById('art').style.backgroundColor = 'rgba(255,204,204,20)';
      document.getElementById('interior-design').style.backgroundColor = 'white';
    } else if (hobby === 'interior-design') {
      this.setState({hobby: "interior-design"});
      document.getElementById('interior-design').style.backgroundColor = 'rgba(255,204,204,20)';
      document.getElementById('art').style.backgroundColor = 'white';
    }
  }

  render() {
    // const { from } = this.props.location.state || { from: { pathname: '/' } };
    // const { redirectToReferrer, failed } = this.state;
    // const {loggedIn} = this.props;

    // if (redirectToReferrer) {
    //   return <Redirect to={from} />;
    // }

    // if (loggedIn) {
    //   return <Redirect to={"/home"} />;
    // }

    // let err = "";
    // if (failed) {
    //   err = <div className="alert alert-danger" role="alert">Login Failed</div>;
    // }
    if (this.state.redirect) {
      return <Redirect to={'/home'} />
    }
    return (
      <div className='div-signup rounded'>
        {/* {err} */}
        <div>
        <p className="header-font">Hobbies Hub</p>
        <h3 id='sign-up-title'>Sign Up</h3>

          <form onSubmit={this.signup}>
            <input className='input rounded' name='username' placeholder='Username' required onChange={this.fieldChanged('username')} />
            <div className='error' id='username'></div>

            <input className='input rounded' name='firstName' placeholder='First Name' required onChange={this.fieldChanged('firstName')} />
            <div className='error' id='first-name'></div>

            <input className='input rounded' name='lastName' placeholder='Last Name' required onChange={this.fieldChanged('lastName')} />
            <div className='error' id='last-name'></div>

            <input className='input rounded' type='number' name='age' placeholder='Age' required onChange={this.fieldChanged('age')} />
            <div className='error' id='age'></div>

            <select name='gender' id='gender-dropdown' defaultValue='' onChange={this.fieldChanged('gender')} required>
              <option value='' disabled hidden>Choose a Gender</option>
              <option value='female'>Female</option>
              <option value='male'>Male</option>
              <option value='transgender-female'>Transgender Female</option>
              <option value='transgender-male'>Transgender Male</option>
              <option value='non-binary'>Non-binary/Non-Conforming</option>
              <option value='no-answer'>Other/Prefer Not to Answer</option>
            </select>
            <div className='error' id='gender'></div>

            <input className='input rounded' type='email' name='email' placeholder='Email' required onChange={this.fieldChanged('email')} />
            <div className='error' id='email'></div>

            <input className='input rounded' type='password' name='password' placeholder='Password' required onChange={this.fieldChanged('password')} />
            <div className='error' id='password'></div>

            <p className="hobby-option">Choose a Hobby:</p>
            <div className="hobbies">
              <button className='button chooseButton' id="art" type="button" onClick={() => this.hobbyButtonPressed('art')}>Art</button>
              <button className='button chooseButton' id="interior-design" type="button" onClick={() => this.hobbyButtonPressed('interior-design')}>Interior Design</button>
            </div>
            <div className='error' id='hobby'></div>

            <button className='button signButton' type="submit">Submit</button>
          </form>

          <p id='log-in'>Already have an account? <Link to='/login'>Log In</Link></p>
        </div>
      </div>
    )
  }
}
SignUp.contextType = AuthContext
export default SignUp;