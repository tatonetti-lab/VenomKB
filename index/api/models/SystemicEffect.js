const mongoose = require('mongoose');

const SystemicEffectSchema = new mongoose.Schema({
    venomkb_id: String,
    name: String,
});

module.exports = mongoose.model('SystemicEffect', SystemicEffectSchema);