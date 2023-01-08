const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: { type: String },
  genre: { type: String },
  directorId: { type: String },
});

module.exports = mongoose.model("Movie", movieSchema);
