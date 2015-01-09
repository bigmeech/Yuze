var mongoose = require("../lib/database"),
    autoIncrement = require("mongoose-auto-increment"),
    Schema = mongoose.Schema,
    ObjectID = Schema.Types.ObjectID;

var User = new Schema({
    userId:Number,
    firstname:String,
    lastname:String,
    hash:String,
    email:String,
    facebookId:String
});
User.plugin(autoIncrement.plugin,{model:'User',field:'userId',startAt:1000});
module.exports = mongoose.model('User', User);
