
var mongoose = require("../lib/database"),
    autoIncrement = require("mongoose-auto-increment"),
    Schema = mongoose.Schema,
    ObjectID = Schema.Types.ObjectID;

var Tag = new Schema({
    tagId:Number,
    name:String
});
Tag.plugin(autoIncrement.plugin,{model:'Tag',field:'tagId',startAt:1000});
module.exports = mongoose.model('Tag', Tag);