var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cb = new Schema({
  name: String,
  email: String,
  mobile: Number
});

module.exports = mongoose.model('Contact', cb);