import React, { Component, useState } from 'react'
import Card from '../../components/profileCard/profileCard.js';
import Cookies from 'universal-cookie'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import {Container, Row, Col } from "react-bootstrap";

function Logout(props){
    const [bio, setBio] = useState("") //initial state of bio is empty
    const [username, setUsername] = useState("")
    const [first, setFirst] = useState("")
    const [last, setLast] = useState("")

    const cookies = new Cookies()
    function logoutTask () {
        cookies.remove('x-auth-token')
        props.history.push('/')
        console.log("TEST1")
    }

    return (
        <>
        {logoutTask()}
        </>
    )
}

export default withRouter(Logout)

