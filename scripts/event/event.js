var mongoose = require('mongoose');

// define the schema for our user model
var eventSchema = mongoose.Schema({
    title : String,
    location : String,
    time : String,
    description : String,
    latitude : Number,
    longitude : Number
    // img: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Event', eventSchema);