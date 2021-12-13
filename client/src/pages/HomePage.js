import React from 'react';
import leah from '../images/leah.jpg';
import ibnat from '../images/ibnat.jpg';
import andy from '../images/andy.jpg';

class HomePage extends React.Component {


  componentDidMount() {
    const id = 1;
    fetch("/api/user-match/" + id)
      .then(res => res.json())
      .then(data => console.log(data))
    fetch("/api/message/" + id)
      .then(res => res.json())
      .then(data => console.log(data))

  }


  render() {

    return (
      <div className="HomePage">

        <h1 className="Logo">Hobbies Hub</h1>
        <br />
        <h2 className="Headers">Recent Matches</h2>

        <div className="row displayRow">
         
          <div className="col-md-3">
            <div class="card">
              <img class="card-img-top" src={andy} alt="Matches" />
              <div class="card-body">
                <h5 class="card-title">Andy</h5>
                <button type="button" class="btn btn-primary">Message</button>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div class="card">
              <img class="card-img-top" src={ibnat} alt="Matches" />
              <div class="card-body">
                <h5 class="card-title">Ibnat</h5>
                <button type="button" class="btn btn-primary">Message</button>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div class="card">
              <img class="card-img-top" src={leah} alt="Matches" />
              <div class="card-body">
                <h5 class="card-title">Leah</h5>
                <button type="button" class="btn btn-primary">Message</button>
              </div>
            </div>
          </div>

          
        </div>

        <h2 className="Headers">Recent Messages</h2>

        <div className="recentMessages">

          <div className="row recents"> <img src={andy} alt='User' className="UserPicM" /> &nbsp; Andy : &nbsp;
            <div className="homeMessage"> Welcome to Hobbies Hub!</div></div>
          <div className="row recents"> <img src={ibnat} alt='User' className="UserPicM" /> &nbsp; Ibnat : &nbsp;
            <div className="homeMessage"> Are you viewing this at demo night?</div></div>
          <div className="row recents"> <img src={leah} alt='User' className="UserPicM" /> &nbsp; Leah : &nbsp;
            <div className="homeMessage"> Try clicking on another page!</div></div>

        </div>


      </div>

    );

  }
}

export default HomePage;