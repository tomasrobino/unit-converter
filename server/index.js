const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3008;
const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello" })
});

async function main() {
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'conversionuser',
        password: 'password',
        database: 'conversions'
    })

    try {
        const [results, fields] = await connection.query('SELECT * from conversions');
        console.log(results);
        console.log(fields);
    } catch(err) {
        console.log(err);
    }
}

main();

app.listen(PORT, () => {
    console.log("server listening at port "+PORT);
});