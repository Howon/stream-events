var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var eventSchema = mongoose.Schema({
    _id : String,
    uploader : String,
    data : {
        title : String,
        location : String,
        time : Date,
        description : String,
        location:{
            name : String,
            address : {
                street : String,
                city : String,
                state : String,
                country : String
            },
            latlng : {
                latitude : Number,
                longitude : Number,
            }
        },   
        img: Schema.Types.Mixed
    }
});

module.exports = mongoose.model('Event', eventSchema);