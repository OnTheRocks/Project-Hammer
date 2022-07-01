const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 5400;
const { graphqlHTTP } = require('express-graphql');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}));

app.listen(port, console.log(`Server running on port ${port}`));