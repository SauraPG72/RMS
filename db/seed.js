const db = require("./db.js");
const dotenv = require("dotenv");
const generateHash = require("../utils/bcrypt.js")

dotenv.config();

db.query("DELETE from users WHERE username = $1", ["Saura"])

db.query("INSERT into users (id, username, email, password_hash, recent_thread, client_id, secret_key, refresh_token) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [2, "Saura", "saura@spgcapital.com.au", "$2a$10$qJzeo3Uv43GQ2CeulDtiduVXRCUbnzO5TZvPpDFfk/mq4ZRkEfPGm", "1824b8f048cc8848", process.env.CLIENT_ID, process.env.SECRET_KEY, process.env.REFRESH_TOKEN])




