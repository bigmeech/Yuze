var rekuire = require("rekuire")
    mongoose = rekuire("database"),
    autoIncrement = require("mongoose-auto-increment"),
    Schema = mongoose.Schema,
    ObjectID = Schema.Types.ObjectId;

var Comment = new Schema({
    id:Number,
    userId:{type:Number, ref:'User'},
    productId:{type:Number, ref:'Product'},
    upVotes:[{type:ObjectID, ref:'User'}],
    downVotes:[{type:ObjectID, ref:'User'}],
    text:String
});

Comment.plugin(autoIncrement.plugin,{model:'Comment',field:'id',startAt:1000});
module.exports = mongoose.model('Comment', Comment);