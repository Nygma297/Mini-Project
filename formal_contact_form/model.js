var mon = require('mongoose');
var Schema = mongoose.Schema;

var cb = new Schema({
    name:String,
    mobile:Number,
    email:String
});

module.exports = mongoose.model('Contact', cb); 