import {useState, useEffect} from 'react'
import axios from 'axios'


export const Header = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        axios.get('/api/users').then((response) => {
            
            setData(response.data.username)
            
        })
    }, [])

    const logOut = () => {
        axios.delete("/api/users")
    }
    return (
        <div className="header">
            <div>
                <h3>Welcome back {data}!</h3>
            </div>
            <div>
                <h3 className="exit" onClick={logOut}>🤸‍♂️</h3>
            </div>
            
        </div>
    )
}