import './App.css';

import { useState } from 'react';

import { Test } from './modules/testComp.js';

import { DisplayOrgsMap } from './modules/display_orgs.js'

import { LogInForm } from './modules/LogIn';


function App() {
  const [logIn, setLogin] = useState(false)



  if(logIn) {
    return (
    <div className="App">
      <Test />

      <DisplayOrgsMap />
    </div>
  );
  }
  else {
    return (
      <div className="App">
        <LogInForm />
      </div>
      
    )
  }
  
}

export default App;
