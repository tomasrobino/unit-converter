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
    connection.query('SELECT count(id) from conversions;', (err, result) => {
        if (err) throw err;
        if(result[0]["count(id)"] > 8) {
            connection.query(`delete from conversions order by id asc limit ${result[0]["count(id)"] - 8};`, (err, result) => {
                if (err) throw err;
            });
        }
        connection.query('SELECT * from conversions order by id desc limit 8;', (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.post('/', (req, res) => {
    if (req.body.first !== undefined) {
        connection.query(`insert into conversions(type, first, second) values(${req.body.type}, ${req.body.first}, ${req.body.second});`);
        res.end("1");
    } else if (req.body.id !== undefined) {
        connection.query(`delete from conversions where id=${req.body.id};`);
    }
});


app.listen(PORT, () => {
    console.log("server listening at port "+PORT);
});