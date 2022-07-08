const express = require('express');
const cors = require ('cors');
const colors = require('colors');
require('dotenv').config();
const schema = require('./schema/schema');
const port = process.env.PORT || 5400;
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/db');

const app = express();

//Connect to MongoDB
connectDB();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
})
);

app.listen(port, console.log(`Server running on port ${port}`.bgBlue.green.bold));