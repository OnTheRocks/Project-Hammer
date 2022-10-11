const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
  matId: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  unit: {
    type: String,   
  },
  notes: {
    type: String,
  },
  
});

module.exports = mongoose.model('Material', MaterialSchema);