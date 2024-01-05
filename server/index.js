const express = require("express");
const cors = require("cors");
const mysql = require('mysql2');
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3008;
const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}), express.json());



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'conversionuser',
    password: 'password',
    database: 'conversions'
});

connection.connect((err) => {
    if (err) {
        console.log("Error connecting to database");
    } else console.log("Connection to database established");
});

app.get("/api", (req, res) => {
    connection.query('SELECT * from conversions', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/', (req, res) => {
    console.log("POST");
    connection.query(`insert into conversions(type, first, second) values(${req.body.type}, ${req.body.first}, ${req.body.second});`);
});


app.listen(PORT, () => {
    console.log("server listening at port "+PORT);
});