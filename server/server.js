const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());

app.listen(5054, () => console.log("Server is running."));

app.get('/wacawaca', (req, res) => {
  console.log("Fuck Yeah!");
})
