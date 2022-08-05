const express = require("express");
const router = express.Router();
const db = require("../db/db");
const axios = require("axios");



router.get("/", (req, res) => {
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



    if (req.session.logged_in) {
        getNewToken().then(response => {
            
            res.json({bearer: response})
        })
    } else {
        res.json({action: false})
    }
})

module.exports = router;