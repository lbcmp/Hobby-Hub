import React from 'react';
import monica from '../images/monica.jpg';

function MatchProfileCard({ userInfo }) {

    return (

        <div className="col-md-3 plsRender">
            <div class="card">
                <img class="card-img-top" src={monica} alt="Matches" />
                <div class="card-body">
                    <h5 class="card-title">{userInfo.firstName + " " + userInfo.lastName}</h5>
                    <div className='acceptReject'>
                        <button type="button" class="btn-primary Accept">&#x2714;</button>
                        <button type="button" class="btn-primary Reject">&#x2715;</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

function MatchCard({userInfo}){

    return(
        
        <div className="col-md-3 plsRender">
                        <div class="card">
                            <img class="card-img-top" src={monica} alt="Matches" />
                            <div class="card-body">
                                <h5 class="card-title">{userInfo.firstName + " " + userInfo.lastName}</h5>
                                <button type="button" class="btn btn-primary">Message</button>
                            </div>
                        </div>
                    </div>

    )
}

class MatchesPage extends React.Component {

    state = {
        matches: [],
        matchProfiles: [],
        useMatchProfileCard: false
    }

    componentDidMount() {
        const id = 7;

        fetch("/api/user-match/" + id)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ matches: data })
            })

    }

    findMatch = () => {
        const id = 7;
        const hobby = "interior-design";
        const age = 25;

        this.setState({useMatchProfileCard: true})

        fetch("/api/match-profile/" + id + "/" + hobby + "/" + age)
            .then(res => res.json())
            .then(data => {
                this.setState({ matches: data.map(m => m.user) })
                this.setState({ matchProfiles: data })
            })
    }

    render() {

        if (this.state.useMatchProfileCard) {
            return (
                <div className="MatchesPage">
    
                    <h1 className="Logo">Hobbies Hub</h1>
                    <br />
                    <h2 className="Headers">Matches</h2>
    
                    <button className="findMatchButton" onClick={this.findMatch}>Click here for new matches</button>
    
                    <div className="display-grid">
                        {this.state.matches.map(e => <MatchProfileCard userInfo={e}></MatchProfileCard>)}
                    </div>
    
                </div>
    
            ); 
        }

        return (
            <div className="MatchesPage">

                <h1 className="Logo">Hobbies Hub</h1>
                <br />
                <h2 className="Headers">Matches</h2>

                <button className="findMatchButton" onClick={this.findMatch}>Click here for new matches</button>

                <div className="display-grid">
                    {this.state.matches.map(e => <MatchCard userInfo={e}></MatchCard>)}
                </div>

            </div>

        );
    }
}

export default MatchesPage;