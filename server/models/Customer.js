const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  custId: {
    type: String,
  },
  name: {
    type: String,
  },
  street: {
    type: String,
  },
  city: {
    type: String,   
  },
  zip: {
    type: String,
  },
  webSite: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

module.exports = mongoose.model('Customer', CustomerSchema);