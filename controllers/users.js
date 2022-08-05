const express = require("express");
const router = express.Router();
const db = require("../db/db");
const axios = require("axios");
const bcrypt = require("bcrypt");


function isValidPassword(plainTextPassword, passwordHash) {
    // Returns true or false
    return bcrypt.compareSync(plainTextPassword, passwordHash);
  }

router.get('/', (req, res) => {
    res.json(req.session)
})

router.delete("/", (req, res) => {
    req.session.destroy();
    res.json({ success: true });
  });


router.post('/login', (req, res) => {
    const email = req.body.email;
    const pw = req.body.pw

    


    db.query("SELECT * from users where email = $1", [email]).then((dbResult) => {
        

        
        
        if(email.toLowerCase() == dbResult.rows[0].email) {
            if (isValidPassword(pw, dbResult.rows[0].password_hash)) {
                sessionObj = {
                    user_id: dbResult.rows[0].id, 
                    username: dbResult.rows[0].username, 
                    email: dbResult.rows[0].email
                }
                req.session.user_id = dbResult.rows[0].id;
                req.session.username = dbResult.rows[0].username;
                req.session.email = dbResult.rows[0].email;
                req.session.logged_in = true;


                res.json(req.session)
            }
            else {
                res.status(400).json({ message: "Login failed, missing PW" });
            }
        }
        else {
            res.status(400).json({ message: "Login failed, wrong email" });
        }
      
        
    }).catch((err) => {
        res.status(400).json({ message: "Login failed" });
      });

    


})




module.exports = router;
