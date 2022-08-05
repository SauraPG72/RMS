DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS organisations CASCADE;
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS types;


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password_hash VARCHAR(255),
    recent_thread VARCHAR(255),
    client_id VARCHAR(255),
    secret_key VARCHAR(255),
    refresh_token VARCHAR(255)
);

CREATE TABLE organisations(
    org_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    org_name VARCHAR(255) UNIQUE
);

CREATE TABLE contacts(
    contact_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    org_name INT REFERENCES organisations(org_id),
    last_contacted TEXT, 
    type VARCHAR(255),
    relationship VARCHAR(255),
    most_recent_thread_ids VARCHAR(50)[5],
    email VARCHAR UNIQUE
);

CREATE TABLE types(
    type_ref TEXT,
    response_time INT
);
