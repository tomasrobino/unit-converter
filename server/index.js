const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3008;
const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello" })
});

const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'conversionuser',
  password: 'password',
  database: 'conversions'
})

connection.connect()

connection.query('SELECT * from conversions', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows)
})

connection.end()


app.listen(PORT, () => {
    console.log("server listening at port "+PORT);
});