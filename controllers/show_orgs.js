const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.get("/", (req, res) => {
    db.query("SELECT * FROM organisations WHERE user_id = $1", [req.session.user_id]).then((resp) => {
        res.json([resp.rows])
        }
        
    )
})

module.exports = router