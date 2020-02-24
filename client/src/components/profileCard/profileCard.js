import React from 'react';
import './profileCard.css';


function Bio(props) {
    return(
            <div className="bio">
                <img src="http://www.croop.cl/UI/twitter/images/up.jpg" alt="background" className="bg"/>
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
            <img src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" alt={props.user.username} className="avatar"/>
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
            <Avatar user={props.user}/>
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

function Card(props) {
    return(
        <div>
            <Header user={props.user}/>
            <Content user={props.user}/>
        </div>
    );
}


const user = {
    username: "belal",
    bio: "Carl Fredricksen is the protagonist in Up. He also appeared in Dug's Special Mission as a minor character.",
    chirps: "245",
    followers: "100",
    following: "415",
}

  export default Card;