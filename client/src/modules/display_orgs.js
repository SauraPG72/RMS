import {useState, useEffect} from 'react'
import axios from 'axios';
import '../App.css'

export const OrgCard = (props) => {



    return <div className="orgCard" onClick={props.orgContactDisplay}>
        {props.orgName}
    </div>
}