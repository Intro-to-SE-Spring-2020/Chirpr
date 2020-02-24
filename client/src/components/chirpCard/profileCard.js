import React from 'react';
import ReactDOM from 'react-dom';
import './chirpCard.css';


function Bio(props) {
    return(
            <div className="bio">
                <img src={props.user.bgURI} alt="background" className="bg"/>
                <div className="desc">
                    <h3>@{props.user.username}</h3>
                    <p>{props.user.bio}</p>
                </div>
            </div>
    );
}

function Avatar(props) {
    return(
        <div className="avatarcontainer">
            <img src={props.user.avatarURI} alt={props.user.username} className="avatar"/>
            <div className="hover">
                    <div className=""></div>
            </div>
        </div>
    );
}

function Header(props) {
    return(
        <header>
            <Bio user={props.user}/>
            <Avatar user={user}/>
        </header>
    );
}

function Data(props) {
    return(
        <div className="data">
            <ul>
                <li key="1">
                    {props.user.chirps}
                    <span>Chirps</span>
                </li>
                <li key="2">
                    {props.user.followers}
                    <span>Followers</span>
                </li>
                <li key="3">
                    {props.user.following}
                    <span>Following</span>
                </li>
            </ul>
        </div>
    );
}

function Content(props) {
    return(
        <div className="content">
			<Data user={props.user}/>
			<div className="follow"> <div class=""></div> Follow</div>
		</div>
    );
}

function Card() {
    return(
        <div>
            <Header user={user}/>
            <Content user={user}/>
        </div>
    );
}
const user = {
    bgURI: "http://www.croop.cl/UI/twitter/images/up.jpg",
    username: "belal",
    bio: "Carl Fredricksen is the protagonist in Up. He also appeared in Dug's Special Mission as a minor character.",
    avatarURI: "http://www.croop.cl/UI/twitter/images/carl.jpg",
    chirps: "245",
    followers: "100",
    following: "415",
}

ReactDOM.render(
    <Card user={user}/>,
    document.getElementById('root')
  );

  export default Card;