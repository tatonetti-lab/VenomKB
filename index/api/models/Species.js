const mongoose = require('mongoose');

const SpeciesSchema = new mongoose.Schema({
    venomkb_id: String,
    species: String
});

module.exports = mongoose.model('Species', SpeciesSchema);