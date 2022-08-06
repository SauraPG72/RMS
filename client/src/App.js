import './App.css';

import axios from 'axios';

import { useState, useEffect } from 'react';

import { Header } from './modules/Header.js';

import { DisplayOrgsMap } from './modules/display_orgs.js'

import { LogInForm } from './modules/LogIn';

import { Inbox } from './modules/DisplayInbox';

import MyImage from './modules/TREKKA1.png'

import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

function App() {
  const [logIn, setLogin] = useState({
    user_id: "",
    username: "",
    email: "",
    bearer: "",
    loggedIn: false
  })

  const [err, setErr] = useState('')

  const updateComps = () => {
    axios.get('api/emails/update').then((response) => {
          

      }
    )
  }

  

  
  const logInSubmit = (emailAdd, pw) => {
    let data = { email: emailAdd, pw: pw }
    axios.post('api/users/login', data).then((res) => {
        setLogin({
              user_id: res.data.user_id,
              username: res.data.username,
              email: res.data.email,
              loggedIn: true
        })

        
    }).catch((err) => {
      setErr(err.response.data.message)
    })
  }

  const checkLogIn = () => {
    axios.get('/api/users').then((response) => {
      if (response.data.logged_in) {
        setLogin({
          user_id: response.data.user_id,
          username: response.data.username,
          email: response.data.email,
          loggedIn: true
        })
        updateComps();
      }
    })
  }





  if(logIn.loggedIn) {

    return (
    <div className="App">
      <div className='header'>
          <Header />
      </div>

      <Inbox />
      

      
    </div>
    );
  }

  else {
    return (
      <div className="App LogIn">
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<div className='log-in'>
        <img src={MyImage} />
          <LogInForm logInSubmit={logInSubmit}/>
          <p>{err}</p>
        </div>} />
        <Route path="/about" element={<About />}/>



        </Routes>
       
        
        </BrowserRouter>
        
        
      </div>
      
    )
  }
  

}

export const About = () => {
  return (
    <div className='About'>
      <img src={MyImage} link='/' data-testid="custom-element2" alt='logo'/>

      <h1>What is Trekka!</h1>

      <p>Trekka is the first of it's kind, email relationship management tool that interfaces directly with the Gmail API</p>
      <p>It re - organises the traditional email inbox, and it helps the busy person of the 21st century, vanigate their emails by people, and conversation rather than the chronologically sorted threads of the traditional inbox</p>

      <strong>Hope you enjoy it, and it saves you some time 😊 </strong>

    </div>
    
  )
}

export default App;
