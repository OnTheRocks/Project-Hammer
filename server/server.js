const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

app.listen(process.env.PORT, () => console.log("Server is running."));

app.get('/wacawaca', (req, res) => {
  console.log("Hello World!");
})
