var rekuire = require("rekuire")
    mongoose = rekuire("database"),
    autoIncrement = require("mongoose-auto-increment"),
    Schema = mongoose.Schema,
    ObjectID = Schema.Types.ObjectID;

var Event = new Schema({
    eventId:Number,
    eventName:String,
    eventDetails:String //only store formats of event message using placeholders to fill in data
});
Event.plugin(autoIncrement.plugin,{model:'eventId',field:'eventId',startAt:1000});
module.exports = mongoose.model('Event', Event);