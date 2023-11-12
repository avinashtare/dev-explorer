const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
    path: { type: String }
});

const imagesDB = mongoose.model('imagesPath', imgSchema);

module.exports = imagesDB;