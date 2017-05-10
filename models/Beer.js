// Include the Mongoose Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BeerSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is Required"
  },
  date: {
  	type: Date,
  	default: Date.now,
  	required: "Date is Required"
  },
  url: {
  	type: String,
  	required: true,
  	required: "URL is Required",
  	unique: true
  }
});

// Create the Model
var Beer = mongoose.model('Beer', BeerSchema);

module.exports = Beer;