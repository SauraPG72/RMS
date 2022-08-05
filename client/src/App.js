import './App.css';

import axios from 'axios';

import { useState, useEffect } from 'react';

import { Test } from './modules/testComp.js';

import { DisplayOrgsMap } from './modules/display_orgs.js'

import { LogInForm } from './modules/LogIn';



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
          <Test />
      </div>
      
      <div className='body-container'>
          <div className="column-head-one">
            Companies
          </div>

              <div className='data-display-company'>
                  <DisplayOrgsMap />
              </div>

          <div className="column-head-two">
            Contacts
          </div>

              <div className="data-display-contacts">
                
              </div>


          <div className="column-head-three">
            Messages
          </div>

            <div className="data-display-messages">
              
            </div>

        
        
      </div> 
      
    </div>
    );
  }

  else {
    return (
      <div className="App">
        <LogInForm logInSubmit={logInSubmit}/>
        <p>{err}</p>
      </div>
      
    )
  }
  

}

export default App;
