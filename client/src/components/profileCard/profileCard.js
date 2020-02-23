import React from 'react';
import './profileCard.css';


function Bio() {
    return(
            <div className="bio">
                <img src="https://scontent-dfw5-1.xx.fbcdn.net/v/t1.0-9/40138945_10156661520343055_6309950786306572288_n.jpg?_nc_cat=110&_nc_sid=dd9801&_nc_ohc=D0pDEYhG2VkAX_7BhfF&_nc_ht=scontent-dfw5-1.xx&oh=89c294b3e5b12e9c59c99759aa903e45&oe=5EB88C38" alt="background" className="bg"/>
                <div className="desc">
                    <h3>@{user.username}</h3>
                    <p>{user.bio}</p>
                </div>
            </div>
    );
}

function Avatar() {
    return(
        <div className="avatarcontainer">
            <img src={user.avatarURI} alt={user.username} className="avatar"/>
            <div className="hover">
                    <div className=""></div>
            </div>
        </div>
    );
}

function Header() {
    return(
        <header>
            <Bio user={user}/>
            <Avatar user={user}/>
        </header>
    );
}

function Data() {
    return(
        <div className="data">
            <ul>
                <li key="1">
                    {user.chirps}
                    <span>Chirps</span>
                </li>
                <li key="2">
                    {user.followers}
                    <span>Followers</span>
                </li>
                <li key="3">
                    {user.following}
                    <span>Following</span>
                </li>
            </ul>
        </div>
    );
}

function Content() {
    return(
        <div className="content">
			<Data user={user}/>
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
    username: "keithwilcox",
    bio: "I am a First Class Airman in the Air National Guard. Salute!!!",
    avatarURI: "https://scontent-dfw5-1.xx.fbcdn.net/v/t1.0-1/p160x160/40157809_10156661526443055_6799565616257695744_n.jpg?_nc_cat=110&_nc_sid=dbb9e7&_nc_ohc=NCh02ucrV8gAX-6Pm60&_nc_ht=scontent-dfw5-1.xx&_nc_tp=6&oh=cb415c13b35397cb413cb3eb9863b2fd&oe=5EF2186E",
    chirps: "245",
    followers: "100",
    following: "415",
}

  export default Card;
