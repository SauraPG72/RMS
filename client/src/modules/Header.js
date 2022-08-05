import {useState, useEffect} from 'react'
import axios from 'axios'


export const Header = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        axios.get('/api/users').then((response) => {
            console.log(response)
            setData(response.data.username)
            
        })
    }, [])
    return (
        <div>
            <p>Welcome back {data}!</p>
        </div>
    )
}