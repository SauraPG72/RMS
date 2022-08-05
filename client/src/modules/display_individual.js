import {useState, useEffect} from 'react'
import axios from 'axios';
import '../App.css'


export const Individual = (props) => {

    
    const [messages, setMessages] = useState([])


    useEffect(() => {
        setMessages([]);
        emailMessages();
    }, [])

    

    const emailMessages = () => {
        setMessages([]);
        let messageIds = [... props.contact.most_recent_thread_ids]
        let messageArr = []
        for (const message of messageIds) {
            axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${message}`, props.bearer).then((response) => {
                let messageHeaders = response.data.payload.headers;
                const subjects = messageHeaders
                .filter((header) => header.name === "Subject")
                .map((header) => header.value)

                messageArr.push(subjects[0])

                setMessages([...messageArr])

            })
        }
    }

    console.log(messages);

   return (
    messages.map((message, idx) => {
        return <RecentMessages message={message} key={idx} />
    })
   )
    


    // return (
    // <div>
    //     {props.contact.last_contacted}
    // </div>
    // messages.map((message, idx) => {

    // })
    // )
}

const RecentMessages = (props) => {
    return <div>
        {props.message}
    </div>
}