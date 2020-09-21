const pg = require('pg');

const pool = new pg.Pool({
    user: "postgres",
    password: "sepehr",
    host: "localhost",
    database:"pern-jwt"
});

module.exports = pool;