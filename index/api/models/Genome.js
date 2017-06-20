const mongoose = require('mongoose');

// Schema to enforce consistent structure.
const GenomeSchema = new mongoose.Schema({
  venomkb_id: String,
  species: String
});

module.exports = mongoose.model('Genome', GenomeSchema);
