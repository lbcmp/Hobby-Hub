import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import MatchesPage from './pages/MatchesPage';
import MessagePage from './pages/MessagePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp'
import UserPic from './images/userpic.png';
import './App.css';
import { AuthProvider } from './context/AuthContext';
// import PrivateRoute from './components/PrivateRoute'; 
// import AuthButton from './components/AuthButton';


function Navigation(props) {
  return (
    <nav className="sidenav">
      <div className="MoveDown">
        <img src={UserPic} alt="Profile" className="UserPic" />
        <Link className="navbar-brand" exact to="/profile">JaneDoe123</Link>
      </div>
      <ul className="navbar-nav mr-auto">
        <div className="myText">
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/matches">
              Matches
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/messages">
              Messages
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/login" onClick={props.logout}>
              Sign out
            </NavLink>
          </li>
        </div>
      </ul>
      {/* <AuthButton/> */}

      <footer className="text-center">  &copy; Hobbies Hub </footer>
    </nav>
  );
}


class App extends React.Component {

  state = {
    loggedIn: false
  }

  login=() => {
    this.setState({ loggedIn: true })
  }

  logout=() => {
    this.setState({ loggedIn: false })
  }


  render() {

    return (
      <AuthProvider>

        <Router>

          {this.state.loggedIn && <Navigation logout={this.logout}></Navigation>}

          {/* <Navigation /> */}
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
                <Route path="/login" render={props=><LoginPage login={this.login} loggedIn={this.state.loggedIn}></LoginPage>} />
                <Route path="/signup" render={props=><SignUp login={this.login} loggedIn={this.state.loggedIn}></SignUp>} />
                <Route path="/home" component={HomePage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/messages" component={MessagePage} />
                <Route path="/matches" component={MatchesPage} />
                <Route path="/" render={props=><LoginPage login={this.login} loggedIn={this.state.loggedIn}></LoginPage>} />
              </Switch>
            </div>
          </div>
        </Router>

      </AuthProvider>
    );
  }
}


export default App;