var rekuire = require("rekuire")
    mongoose = rekuire("database"),
    autoIncrement = require("mongoose-auto-increment"),
    Schema = mongoose.Schema,
    ObjectID = Schema.Types.ObjectID;

var Notification = new Schema({
    userId:{type:Schema.Types.ObjectId, ref:'User'},
    eventId:String,
    message:String //created by compiling eventDetails with Data to replace placeholders
});
module.exports = mongoose.model('Notification', Notification);