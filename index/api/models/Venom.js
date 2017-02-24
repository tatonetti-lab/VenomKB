const mongoose = require('mongoose');

// Schema to enforce consistent structure.
const VenomSchema = new mongoose.Schema({
  _id: String,
  species_id: String,
  name: String,
  completed: { type: Boolean, default: false },
  note: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Venom', VenomSchema);
