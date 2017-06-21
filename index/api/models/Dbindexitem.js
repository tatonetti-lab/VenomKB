const mongoose = require('mongoose');

// Schema to enforce consistent structure.
const DbindexitemSchema = new mongoose.Schema({
    name: String,
    venomkb_id: String,
    data_type: String
});

module.exports = mongoose.model('Dbindexitem', DbindexitemSchema);
