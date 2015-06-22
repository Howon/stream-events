var mongoose = require('mongoose');
// define the schema for our user model

var threadSchema = mongoose.Schema({
	user_id : String,
    content : String,
    time : Date,
    event_source : String,
    upvote : Number
});

module.exports = mongoose.model('Thread Post', threadSchema);