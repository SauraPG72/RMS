import axios from "axios";
import { useEffect, useState } from "react";


export const LogInForm = (props) => {
    
    const [email, setEmail] = useState("");
    const [pw, setPW] = useState("")

    const submit = (event) => {
        
        event.preventDefault();
        console.log(event.target[0].value, event.target[1].value)
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
                <button type="submit">Submit</button>
            </div>
      </form>
    );
}