import React from 'react'
import './profileCard.css'

function Bio (props) {
  return (
    <div className="bio">
      <img src="http://www.croop.cl/UI/twitter/images/up.jpg" alt="background" className="bg"/>
      <div className="desc">
        <h3>@{props.username}</h3>
        <p>{props.bio}</p>
      </div>
    </div>
  )
}

function Avatar (props) {
  return (
    <div className="avatarcontainer">
      <img src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" alt={props.username} className="avatar"/>
      <div className="hover">
        <div className=""></div>
      </div>
    </div>
  )
}

function Header (props) {
  return (
    <header>
      <Bio username={props.username} bio={props.bio}/>
      <Avatar user={props.user}/>
    </header>
  )
}

function Data (props) {
  return (
    <div className="data">
      <ul>
        <li key="1">
                    0
          <span>Chirps</span>
        </li>
        <li key="2">
                    0
          <span>Followers</span>
        </li>
        <li key="3">
                    0
          <span>Following</span>
        </li>
      </ul>
    </div>
  )
}

function Content (props) {
  return (
    <div className="content">
      <Data/>
      <div className="follow"> <div class=""></div> Follow</div>
    </div>
  )
}

function Card (props) {
  console.log(props)
  return (
    <div>
      <Header username={props.username} bio={props.bio} />
      <Content />
    </div>
  )
}

export default Card
