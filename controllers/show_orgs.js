const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.get("/", (req, res) => {
    db.query("SELECT * FROM organisations WHERE user_id = $1", [req.session.user_id]).then((resp) => {
        res.json([resp.rows])
        }
        
    )
})


router.get("/:org_name", (req, res) => {
    db.query("SELECT * from contacts WHERE org_name=$1", [req.params.org_name]).then((response) => {
        
        res.json(response.rows)
    })
})

module.exports = router