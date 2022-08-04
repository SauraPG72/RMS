import {useState, useEffect} from 'react'
import axios from 'axios';

export const DisplayOrgsMap = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("/api/orgs").then((response) => {
            setData(response.data[0])
            
            
        })
    }, [])
    console.log(data)
    return (
       data.map((org, idx) => {
        return <OrgCard orgName={org.org_name} key={idx}/>
       })
    )
}

const OrgCard = (props) => {
    return <div>
        {props.orgName}
    </div>
}