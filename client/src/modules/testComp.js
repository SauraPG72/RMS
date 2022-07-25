import {useState, useEffect} from 'react'
import axios from 'axios'


export const Test = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        axios.get('/api').then((response) => {
            console.log(response)
            setData(response.data.success)
            
        })
    }, [])
    return (
        <div>
            <p>{data}</p>
        </div>
    )
}