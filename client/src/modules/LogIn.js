import axios from "axios";
import { useEffect, useState } from "react";
import '../App.css'

export const LogInForm = (props) => {
    
    const [email, setEmail] = useState("");
    const [pw, setPW] = useState("")

    const submit = (event) => {
        
        event.preventDefault();
        
        props.logInSubmit(event.target[0].value, event.target[1].value)
        
        
    }
    
    return (
      <form onSubmit={submit} name="form">
        <label>
          <p>Username</p>
          <input type="text" name="email"/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" name="pw"/>
        </label>
            <div>
                <button className="style-button" type="submit">Submit</button>
            </div>
      </form>
    );
}