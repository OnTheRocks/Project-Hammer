const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql");
dotenv.config();

//---------------create the connection information for the sql database---------------------
const connection = mysql.createConnection({
  host: "",
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB_NAME
})

//--------------------connect to the mysql server and sql database--------------------------------------
connection.connect(error => {
  if (error) throw error;
  console.log("Connected to", process.env.DB_NAME, ".");
});

app.use(express.json());
app.use(cors());

var server = app.listen(process.env.PORT, () => console.log("Server is running."));

app.get('/customers', (req, res) => {
  let sql = "SELECT * FROM customers";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.send('Customers fetched....')
  });
});

app.get('/customers/:id', (req, res) => {
  let sql = `SELECT * FROM customers WHERE custID = ${req.params.id}`;
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.send("Customer fetched...");
  });
});
