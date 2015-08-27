var mongoose = require('mongoose'),
	Event = require('../data_schemas/event'),
    Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    info: {
            id    : String,
            token : String,
            email : String,   
            name  : String
    }
});

module.exports = mongoose.model('User', userSchema);