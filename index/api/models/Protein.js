const mongoose = require('mongoose');

// Schema to enforce consistent structure.
const ProteinSchema = new mongoose.Schema({
  venomkb_id: String,
  species: String
});

module.exports = mongoose.model('Protein', ProteinSchema);
