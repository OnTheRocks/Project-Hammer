const { projects,  clients, customers } = require('../sampleData');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList,  } = require('graphql');

//Clients
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString},
    email: { type: GraphQLString},
    phone: { type: GraphQLString}
  })
});


//Customers
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString}, 
    email: { type: GraphQLString},
    phone: { type: GraphQLString}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customers: {
      type: GraphQLList(CustomerType),
      resolve(parent, args) {
        return customers;
      }
    },
    customer: {
      type: CustomerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return customers.find(customer => customer.id === args.id);
      }
    },
    clients: {
      type: GraphQLList(ClientType),
      resolve(parent, args) {
        return clients;
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return clients.find(client => client.id === args.id);
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery
})