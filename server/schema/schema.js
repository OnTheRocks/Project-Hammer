const Customer = require('../models/Customer');
const Ticket = require('../models/Ticket');
const Material = require('../models/Material');


const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema, 
        GraphQLID, 
        GraphQLList, 
        GraphQLInt, 
        GraphQLNonNull,
        GraphQLDeprecatedDirective,
      } = require('graphql');

//Tickets
const TicketType = new GraphQLObjectType({
  name: 'Ticket',
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLString},
    ticketNum: { type: GraphQLString},
    customer: { 
      type: CustomerType,
      resolve(parent, args) {
        return Customer.findById(parent.customerId);
      },
    },

    material: { type: GraphQLString},
    tareWeight: { type: GraphQLInt},
    grossWeight: { type: GraphQLInt},
    netWeight: { type: GraphQLInt},
    notes: { type: GraphQLString},
  }),
});

//Materials
const MaterialType = new GraphQLObjectType({
  name: "Material",
  fields: () => ({
    id: { type: GraphQLID },
    matId: { type: GraphQLString},
    name: { type: GraphQLString },
    notes: { type: GraphQLString,}
  }),  
});


//Customers
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLID },
    custId: { type: GraphQLString}, 
    name: { type: GraphQLString}, 
    street: { type: GraphQLString}, 
    city: { type: GraphQLString}, 
    zip: { type: GraphQLString}, 
    webSite: { type: GraphQLString}, 
    email: { type: GraphQLString},
    phone: { type: GraphQLString},
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {

    tickets: {
      type: new GraphQLList(TicketType),
      resolve(parent, args) {
        return Ticket.find();
      },
    },
    ticket: {
      type: TicketType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Ticket.findById(args.id);
      },
    },

    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parent, args) {
        return Customer.find();
      },
    },    
    customer: {
      type: CustomerType, 
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Customer.findById(args.id);
      }, 
    },

    // materials: {
    //   type: new GraphQLList(MaterialType),
    //   resolve(parent, args) {
    //     return Material.find();
    //   },
    // },
    // material: {
    //   type: MaterialType,
    //   args: {id: { type: GraphQLID } },
    //   resolve(parent, args) {
    //     return Material.findById(args.id);
    //   },
    // },
  },
});

//Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    //Add Customer
    addCustomer: {
      type: CustomerType,
      args: {
    custId: { type: GraphQLString}, 
    name: { type: GraphQLString}, 
    street: { type: GraphQLString}, 
    city: { type: GraphQLString}, 
    zip: { type: GraphQLString}, 
    webSite: { type: GraphQLString}, 
    email: { type: GraphQLString},
    phone: { type: GraphQLString},
      },
      resolve(parent, args) {
        const customer = new Customer({
          custId: args.custId,
          name: args.name,
          street: args.street,
          city: args.city,
          zip: args.zip,
          webSite: args.webSite,
          email: args.email,
          phone: args.phone,
        });
        return customer.save();
      }
    },
    // //Add Material
    // addMaterial: {
    //   type: MaterialType,
    //   args: {
    // matId: { type: GraphQLString}, 
    // name: { type: GraphQLString},
    // notes: { type: GraphQLString},
    //   },
    //   resolve(parent, args) {
    //     const material = new Material({
    //       matId: args.matId,
    //       name: args.name,
    //       notes: args.notes,
    //     });
    //     return material.save();
    //   }
    // },
    // Delete Customer
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Customer.findByIdAndRemove(args.id);
      },
    },
    // // Delete Material
    // deleteMaterial: {
    //   type: MaterialType,
    //   args: {
    //     id: { type: GraphQLNonNull(GraphQLID) },
    //   },
    //   resolve(parent, args) {
    //     return Material.findByIdAndRemove(args.id);
    //   },
    // },



    // Add Ticket
    addTicket: {
      type: TicketType,
      args: {
        date: { type: GraphQLNonNull(GraphQLString) },
        ticketNum: { type: GraphQLNonNull(GraphQLString) },
        customerId: { type: GraphQLNonNull(GraphQLID) },
        material: { type: GraphQLNonNull(GraphQLString) },
        tareWeight: { type: GraphQLNonNull(GraphQLInt) },
        grossWeight: { type: GraphQLNonNull(GraphQLInt) },
        netWeight: { type: GraphQLNonNull(GraphQLInt) },
        notes: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const ticket = new Ticket({
          date: args.date,
          ticketNum: args.ticketNum,
          customerId: args.customerId,
          material: args.material,
          tareWeight: args.tareWeight,
          grossWeight: args.grossWeight,
          netWeight: args.netWeight,
          notes: args.notes,
        });
        return ticket.save();
      }
    },

    //Delete a Ticket
    deleteTicket: {
      type: TicketType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Ticket.findByIdAndRemove(args.id);
      },
    },


  // Update Ticket
  updateTicket: {
    type: TicketType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      date: { type: GraphQLString },
      ticketNum: { type: GraphQLString },
      customerId: { type: GraphQLID },
      material: { type: GraphQLID },
      tareWeight: { type: GraphQLInt },
      grossWeight: { type: GraphQLInt },
      netWeight: { type: GraphQLInt },
      notes: { type: GraphQLString },
    },
    resolve(parent, args) {
      return Ticket.findByIdAndUpdate(
        args.id,
        {
          $set: {
            date: args.date,
            ticketNum: args.ticketNum,
            customerId: args.customerId,
            material: args.material,
            tareWeight: args.tareWeight,
            grossWeight: args.grossWeight,
            netWeight: args.netWeight,
            notes: args.notes,
          },
        },
        { new: true }
      );
    },
   },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});