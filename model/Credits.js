var mongoose = require("../lib/database"),
    autoIncrement = require("mongoose-auto-increment"),
    Schema = mongoose.Schema,
    ObjectID = Schema.Types.ObjectID;

var Credits = new Schema({
    userId:{type:Schema.Types.ObjectId, ref:'User'},
    productCode:String,
    points:Number
});
module.exports = mongoose.model('Credits', Credits);