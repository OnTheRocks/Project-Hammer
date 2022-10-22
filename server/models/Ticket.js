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
  materialId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material',
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