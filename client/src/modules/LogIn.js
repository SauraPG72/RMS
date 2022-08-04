import axios from "axios";
import { useEffect, useState } from "react";

export const LogInForm = () => {
    
    const submit = (event) => {
        event.preventDeafult();
        const form = document.getElementsByName("form")
        const formData = new FormData(form);
        const data = {
          
          username: formData.get("email"),
          password: formData.get("pw"),
        };

        console.log(data)
        
    }
    
    return (
      <form onSubmit={submit} name="form">
        <label>
          <p>Username</p>
          <input type="text" name="email" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" name="pw" />
        </label>
            <div>
                <button type="submit">Submit</button>
            </div>
      </form>
    );
}