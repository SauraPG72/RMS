import {useState, useEffect} from 'react'
import axios from 'axios';
import '../App.css'
import { OrgCard } from './display_orgs';



export const ClickAbleContacts = (props) => {
    
    return <div onClick={props.finalContactDisplay}>
        {props.organisation.name}
    </div>
}