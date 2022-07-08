const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  ticketNum: {
    type: String,
  },
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  material: {
    type: String,
  },
  tareWeight: {
    type: String,
  },
  grossWeight: {
    type: String,
  },
  netWeight: {
    type: String,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model('Ticket', TicketSchema);