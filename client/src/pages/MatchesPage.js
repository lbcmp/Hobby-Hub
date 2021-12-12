import React from 'react';
import monica from '../images/monica.jpg';
// import rachel from '../images/rachel.jpg';
// import ross from '../images/ross.jpg';
// import phoebe from '../images/phoebe.png';
// import joey from '../images/joey.png';
// import chandler from '../images/chandler.jpg';
// import janice from '../images/janice.png';
// import gunther from '../images/gunther.jpg';
// import marcel from '../images/marcel.jpg';

function MatchCard(){

    return(
        
        <div className="col-md-3 plsRender">
                        <div class="card">
                            <img class="card-img-top" src={monica} alt="Matches" />
                            <div class="card-body">
                                <h5 class="card-title">Monica</h5>
                                <button type="button" class="btn btn-primary">Message</button>
                            </div>
                        </div>
                    </div>

    )
}

class MatchesPage extends React.Component {

    state={
        matches: []
    }

    componentDidMount() {
        const id = 1;

        fetch("/api/user-match/" + id)
            .then(res => res.json())
            .then(data => console.log(data))

        fetch("/api/match-profile/" + id)
            .then(res => res.json())
            .then(data => console.log(data))

    }

    findMatch = () =>{
        const id = 1;
        const hobby = "Art";
        const age = 21;

        fetch("/api/match-profile/"+ id + "/" + hobby + "/" + age)
        .then(res => res.json())
        .then(data => this.setState({ matches: [1,2,3,4,5,6,7,8,9]}))
    }

    render() {

        return (
            <div className="MatchesPage">

                <h1 className="Logo">Hobbies Hub</h1>
                <br />
                <h2 className="Headers">Matches</h2>

                <button className="findMatchButton" onClick={this.findMatch}>Click here for new matches</button>

                <div className="display-grid">
                    {this.state.matches.map(e =>  <MatchCard></MatchCard>)}
                </div>   

            </div>

        );
    }
}

export default MatchesPage;