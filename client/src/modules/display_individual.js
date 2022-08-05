import {useState, useEffect} from 'react'
import axios from 'axios';
import '../App.css'

export const Individual = (props) => {
    return (
    <div>
        {props.contact.last_contacted}
    </div>
    )
}