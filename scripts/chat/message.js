var mongoose = require('mongoose');

// define the schema for our user model
var messageSchema = mongoose.Schema({
    name: String,
    message: String
});

module.exports = mongoose.model('Message', messageSchema);