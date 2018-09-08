const mongoose = require('mongoose');

const  Schema  = mongoose.Schema;

const ProducSchema = new Schema({
  name: String,
  value: String,
  reference:String
});


module.exports = mongoose.model('product', ProducSchema);
