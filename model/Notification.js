
var mongoose = require("../lib/database"),
    autoIncrement = require("mongoose-auto-increment"),
    Schema = mongoose.Schema,
    ObjectID = Schema.Types.ObjectID;

var Notification = new Schema({
    userId:{type:Schema.Types.ObjectId, ref:'User'},
    eventId:String,
    message:String // created by compiling eventDetails with Data to replace placeholders
});
Tag.plugin(autoIncrement.plugin,{model:'Tag',field:'tagId',startAt:1000});
module.exports = mongoose.model('Tag', Tag);