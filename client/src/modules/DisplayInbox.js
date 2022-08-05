import { OrgCard } from "./display_orgs";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ClickAbleContacts } from "./display_contacts";
import { Individual } from "./display_individual";

export const Inbox = () => {
    // first request to database to make sure we can display the right organisations 
    const [orgs, orgsShown] = useState([]);

    useEffect(() => {
        axios.get("/api/orgs").then((response) => {
            orgsShown(response.data[0])
        })
    }, [])


    //this will allow you to click on an organisation and check their contacts out
    const [selectedOrg, setSelectedOrg] = useState([]);

    const orgContactDisplay = (orgId) => {
        axios.get(`api/orgs/${orgId}`).then((response) => {
            setSelectedOrg(response.data);
            setContact({})
            setIndividual(false)
        })
    }

    // now for displaying the relevant contacts for the deal!
    const [contact, setContact] = useState({})


    const finalContactDisplay = (contactObj) => {
        setContact(contactObj);
        setIndividual(true)
    }

    // setting a bearer token to authenitcate my access to the google API 
    const [individual, setIndividual] = useState(false)

    const [bearer, setBearer] = useState('')

    const bearerRetrieve = () => {
        axios.get('/api/bearer').then(response => {
            
            setBearer({
                headers: { Authorization: `Bearer ${response.data.bearer}` },
              })
        })
    }

    useEffect(() => {
        bearerRetrieve();
    }, [])


    return (
        <div className='body-container'>
        <div className="column-head-one">
          Companies
        </div>

            <div className='data-display-company'>
                {orgs.map((org, idx) => {
                    return <OrgCard orgName={org.org_name} orgId={org.org_id} key={idx} orgContactDisplay={() => {orgContactDisplay(org.org_id)}}/>
                })}
            </div>

        <div className="column-head-two">
          Contacts
        </div>

            <div className="data-display-contacts">
              {selectedOrg.map((organisation, idx) => {
                return <ClickAbleContacts organisation={organisation} key={idx} finalContactDisplay={()=>finalContactDisplay(organisation)}/>
              })}
            </div>


        <div className="column-head-three">
          Messages
        </div>

          <div className="data-display-messages">
            {individual ? <Individual contact={contact} bearer={bearer}/> : <div> </div>}
            {/* <Individual contact={contact} bearer={bearer}/> */}
          </div>
    </div> 
    )
}