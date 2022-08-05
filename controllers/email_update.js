const express = require("express");
const router = express.Router();
const db = require("../db/db");
const axios = require("axios");






router.get("/update", (req, res) => {


    const accessDb = (id) => {
        return db.query("SELECT * from users WHERE id = $1", [id]).then((res) => res.rows[0]);
      };
      
      const getNewToken = async () => {
        const tokensObj = await accessDb(req.session.user_id);
      
        const params = new URLSearchParams();
        let newAccToken;
        params.append("client_id", tokensObj.client_id);
        params.append("client_secret", tokensObj.secret_key);
        params.append("refresh_token", tokensObj.refresh_token);
        params.append("grant_type", "refresh_token");
        newAccToken = await axios
          .post("https://accounts.google.com/o/oauth2/token", params)
          .then((res) => {
            return res.data.access_token;
          });
      
        return newAccToken;
      };




  

  getNewToken().then((accessToken) => {
    const tconfig = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    let updateArray = [];

    req.session.bearer = accessToken

    axios
      .get("https://gmail.googleapis.com/gmail/v1/users/me/messages", tconfig)
      .then((response) => {

        

        for (const message of response.data.messages) {
          let eachMessage = {
            from: "",
            company: "",
            messageId: message.id,
            email: "",
            date: ""
          };

          const thisPromise = axios
            .get(
              `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
              tconfig
            )
            .then((response) => {
              let messageHeaders = response.data.payload.headers;

              const senders = messageHeaders
                .filter((header) => header.name === "From")
                .map((header) => header.value)
                .map((value) => value.split(" <"))
                .forEach((element) => {
                  return eachMessage.from = element[0];
                });

              const emails = messageHeaders
                .filter((header) => header.name === "From")
                .map((header) => header.value)
                .forEach((email) => {
                    let trimmed = email.slice((email.indexOf('<') + 1), email.indexOf('>'))

                    return eachMessage.email = trimmed
                    
                })

              const dates = messageHeaders
                .filter((header) => header.name === "Date")
                .map((header) => header.value) 
                .forEach((date) => {
                    eachMessage.date = date
                })
                
              

              const companies = messageHeaders
                .filter((header) => header.name === "From")
                .map((header) => header.value)
                .map((value) => value.split(" <"))

                .map((arr) => {
                  if (arr[1]) {
                    return arr[1];
                  } else {
                    return arr[0];
                  }
                })
                .map((arr) => {
                  if (arr) {
                    return arr.replace(">", "");
                  } else {
                    return;
                  }
                })
                .forEach((email) => {
                  if (email) {
                    let subArr = email.split("@");
                    let afterAt = subArr[1].split(".");

                    if (afterAt.includes("com")) {
                      let idx = afterAt.indexOf("com");
                      const company = afterAt[idx - 1];
                      return eachMessage.company = company;
                    } else {
                      let company = afterAt.join("");
                      return eachMessage.company = company;
                    }
                  } else {
                    return eachMessage.company = "";
                  }
                });

                return eachMessage
            })
            updateArray.push(thisPromise)
           
           
        }

        

        Promise.all(updateArray).then((arrOfObj) => {


            let allCompanies = arrOfObj.map((obj) => obj.company);
            let uniqueCompanies = [...new Set(allCompanies)];
            for (const unique of uniqueCompanies) {
                db.query("INSERT into organisations (org_name, user_id) VALUES ($1, $2) ON CONFLICT (org_name) DO NOTHING", [unique, req.session.user_id])
            }
            
            db.query("SELECT * FROM contacts FULL OUTER JOIN organisations ON organisations.org_id = contacts.org_name WHERE organisations.user_id = $1", [req.session.user_id]).then((result) => {
                
                
                //this is an array of all the organisation names that currently exist in the database
                let orgsNameArr = result.rows.map((obj) => obj.org_name);

                let orgsNameAndOrgIdObjs = result.rows.map((obj) => {
                     return {"company_name": obj.org_name,
                             "company_id": obj.org_id}
                })

                

                let newContactsWithNewOrgs = [];
                let newContactsWithExistingOrgs = [];

                //this is an array of all the contacts that currently exist in the DB
                let fullContactsArr = result.rows.filter((obj) => obj.contact_id);


                //this is an array of all the contact names that currently exist in the DB
                let contactNamesArr = result.rows.filter((obj) => obj.contact_id).map((obj2) => {
                    return obj2.name
                })
                
                const objOfContacts = {};

                for (let i=(arrOfObj.length - 1); i >= 0; i = i - 1) {

                    const email = arrOfObj[i];

                              
                    if (objOfContacts[email.email]) {

                        objOfContacts[email.email].date = email.date;

                        if ( objOfContacts[email.email].messageIds.length >= 5) {
                            objOfContacts[email.email].messageIds.unshift(email.messageId);
                            objOfContacts[email.email].messageIds.pop()
                        }
                        else {
                            objOfContacts[email.email].messageIds.unshift(email.messageId)
                        }

                      
                        
                        
    
                    } 
                    else {
                        objOfContacts[email.email] = {
                            date: email.date, 
                            messageIds: [], 
                            name: email.from,
                            company: email.company, 
                            email: email.email,
                        }
                       objOfContacts[email.email].messageIds.push(email.messageId);

                       if (!orgsNameArr.includes(objOfContacts[email.email].company) && !contactNamesArr.includes(objOfContacts[email.email].name))              
                        {
                            let newContactWithNewOrg = db.query("INSERT INTO organisations (org_name, user_id) VALUES ($1, $2) ON CONFLICT (org_name) DO NOTHING RETURNING org_id", [objOfContacts[email.email].company, req.session.user_id])
                            .then(result => {
                                if (result.rows[0].org_id) {
                                    return result.rows[0].org_id
                                }
                                else {
                                    console.log("org_id doesn't exist")
                                }
                            })                                
                            .then((orgId) => { 
                                return {...objOfContacts[email.email],  org_id: orgId }
                            })
                            orgsNameArr.push(objOfContacts[email.email].company)
                            
                            newContactsWithNewOrgs.push(newContactWithNewOrg)
                            
                       }

                       else {

                            let newContactsWithOldOrg = db.query("SELECT * FROM organisations WHERE org_name = $1 AND user_id = $2", [objOfContacts[email.email].company, req.session.user_id]).then((result) => { 

                                console.log(result.rows[0])

                                return result.rows[0].org_id;
                    

                                })
                                .then((orgId) => {
                                return {...objOfContacts[email.email],  org_id: orgId }
                            })

                            newContactsWithExistingOrgs.push(newContactsWithOldOrg)
                        }
    
                    }
                    
                }

                return Promise.all([ ...newContactsWithNewOrgs, ...newContactsWithExistingOrgs])

            }).then((arrOfNewContactsAllOrgs) => {
                
                arrOfNewContactsAllOrgs.map((objOfNew) => {
                    db.query("INSERT INTO contacts (name, org_name, last_contacted, most_recent_thread_ids, email) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO UPDATE SET (last_contacted, most_recent_thread_ids) = (EXCLUDED.last_contacted, EXCLUDED.most_recent_thread_ids)", [objOfNew.name, objOfNew.org_id, objOfNew.date, objOfNew.messageIds, objOfNew.email]).then((succ) => succ)
                })        
               
                res.json({success: true})
            });

        })

      })
  })
  
});

module.exports = router;
