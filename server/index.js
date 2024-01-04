const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3008;
const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}));

async function get(connection) {
    try {
        const [results, fields] = await connection.query('SELECT * from conversions');
        console.log(results);
        console.log(fields);

        app.get("/api", (req, res) => {
            res.json(results)
        });

    } catch(err) {
        console.log(err);
    }
}

async function initdb() {
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'conversionuser',
        password: 'password',
        database: 'conversions'
    })

    get(connection);
}

initdb();

app.listen(PORT, () => {
    console.log("server listening at port "+PORT);
});