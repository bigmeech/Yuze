var rekuire = require("rekuire")
    mongoose = rekuire("database"),
    autoIncrement = require("mongoose-auto-increment"),
    Schema = mongoose.Schema,
    ObjectID = Schema.Types.ObjectID;

var TagMap = new Schema({
    tagMapId:Number,
    tagId:{type:Schema.Types.ObjectId, ref:'Tag'},
    barcode:String
});
TagMap.plugin(autoIncrement.plugin,{model:'TagMap',field:'tagMapId',startAt:1000});
module.exports = mongoose.model('TagMap', TagMap);