import './App.css';

import axios from 'axios';

import { useState, useEffect } from 'react';

import { Header } from './modules/Header.js';

import { DisplayOrgsMap } from './modules/display_orgs.js'

import { LogInForm } from './modules/LogIn';

import { Inbox } from './modules/DisplayInbox';

import MyImage from './modules/TREKKA1.png'

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
        
        <div className='log-in'>
        <img src={MyImage} />
          <LogInForm logInSubmit={logInSubmit}/>
          <p>{err}</p>
        </div>
        
      </div>
      
    )
  }
  

}

export default App;
