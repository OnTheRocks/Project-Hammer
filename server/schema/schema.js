//Mongoose models
const Customer = require('../models/Customer');
const Ticket = require('../models/Ticket');


const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema, 
        GraphQLID, 
        GraphQLList, 
        GraphQLInt, 
        GraphQLNonNull,
      } = require('graphql');


      //Client Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
});

//Tickets
const TicketType = new GraphQLObjectType({
  name: 'Ticket',
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLString},
    ticketNum: { type: GraphQLString},
    customer: { type: CustomerType,
      resolve(parent, args) {
        return Customer.findById(parent.customerId);
      },
    },
    material: { type: GraphQLString},
    tareWeight: { type: GraphQLInt},
    grossWeight: { type: GraphQLString},
    netWeight: { type: GraphQLString},
    notes: { type: GraphQLString},
  })
});


//Customers
// const CustomerType = new GraphQLObjectType({
//   name: "Customer",
//   fields: () => ({
//     id: { type: GraphQLID },
//     name: { type: GraphQLString}, 
//     email: { type: GraphQLString},
//     phone: { type: GraphQLString}
//   })
// });

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    tickets: {
      type: new GraphQLList(TicketType),
      resolve(parent, args) {
        return Tickets.find();
      }
    },
    ticket: {
      type: TicketType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Ticket.findById(args.id);
      }
    },

    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parent, args) {
        return Customer.find();
      }
    },
    // customer: {
    //   type: CustomerType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parent, args) {
    //     return Customer.findById(parent.customerId);
    //   }
    // }
    
    customer: {
      type: CustomerType, 
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Customer.findById(parent.customerId);
      } 
    },
  }
});

//Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type:  GraphQLNonNull(GraphQLString)},
      },
      resolve(parent, args) {
        const Customer = new Customer({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return customer.save();
      }
    },
    // Add Ticket
    addTicket: {
      type: TicketType,
      args: {
        date: { type: GraphQLNonNull(GraphQLString) },
        ticketNum: { type: GraphQLNonNull(GraphQLString) },
        customerID: { type: GraphQLNonNull(GraphQLID) },
        material: { type: GraphQLNonNull(GraphQLString) },
        tareWeight: { type: GraphQLNonNull(GraphQLInt) },
        grossWeight: { type: GraphQLNonNull(GraphQLInt) },
        netWeight: { type: GraphQLNonNull(GraphQLInt) },
        notes: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const Ticket = new Ticket({
          date: args.date,
          ticketNum: args.ticketNum,
          customerID: args.customerID,
          material: args.material,
          tareWeight: args.tareWeight,
          grossWeight: args.grossWeight,
          netWeight: args.netWeight,
          notes: args.notes,
        });
        return ticket.save();
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});