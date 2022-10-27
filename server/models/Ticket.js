const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  ticketNum: {
    type: String,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  material: {
    type: String,
  },
  tareWeight: {
    type: Number,
  },
  grossWeight: {
    type: Number,
  },
  netWeight: {
    type: Number,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model('Ticket', TicketSchema);