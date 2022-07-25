const express = require('express');
const pg = require('pg')

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json())

app.get('/api', (req, res) => {
  res.send({success: 'hello'})
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
});

let db;
if (process.env.NODE_ENV === 'production') {
  db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
} else {
  db = new pg.Pool({
    database: 'my_local_database_name',
    password: 'optional_password' // If you have a password on your local db
  })
}