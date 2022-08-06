
const express = require("express");
const app = express();
const db = require("./db/db.js");
const port = process.env.PORT || 3001;
const expressSession = require("express-session");
require("dotenv").config();
const pgSession = require('connect-pg-simple')(expressSession);
const axios = require("axios");

app.use(express.static('./client/build'))


app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date()} ${req.method} ${req.path}`);
  next()
});

app.use(
  expressSession({
    store: new pgSession({
      pool: db,
      createTableIfMissing: true,
    }),
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,
  })
);


app.get('/api', (req, res) => {
  res.send({success: 'hello'})
});

const emailControls = require("./controllers/email_update.js");
const userControls = require("./controllers/users.js");
const orgsDisplay = require("./controllers/show_orgs.js");
const bearerAcc = require("./controllers/authorise.js")

app.use("/api/emails", emailControls);
app.use("/api/users", userControls);
app.use("/api/orgs", orgsDisplay);
app.use("/api/bearer", bearerAcc);




app.listen(port, () => {
  console.log(`http://localhost:${port}`)
});

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
})