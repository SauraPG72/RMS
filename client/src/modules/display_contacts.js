import {useState, useEffect} from 'react'
import axios from 'axios';
import '../App.css'
import { OrgCard } from './display_orgs';



export const ClickAbleContacts = (props) => {
    


    console.log(props);

    return <div onClick={props.finalContactDisplay} className="contact-list">
        {props.organisation.name} 
        <div>
            {props.organisation.last_contacted}
        </div>
        
    </div>
}