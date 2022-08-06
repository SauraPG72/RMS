import {useState, useEffect} from 'react'
import axios from 'axios';
import '../App.css'
import { OrgCard } from './display_orgs';



export const ClickAbleContacts = (props) => {
    
    let shortened = props.organisation.last_contacted.split(" ").slice(0, 3).join(" ")
    

    

    return <div onClick={props.finalContactDisplay} className="contact-list">
       <strong>{props.organisation.name} </strong> 
        <div>
            {shortened}
        </div>
        
    </div>
}