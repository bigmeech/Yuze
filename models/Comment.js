var rekuire = require("rekuire")
    mongoose = rekuire("database"),
    autoIncrement = require("mongoose-auto-increment"),
    Schema = mongoose.Schema,
    ObjectID = Schema.Types.ObjectID;

var Comment = new Schema({
    commentId:Number,
    userId:{type:String, ref:'User'},
    upVotes:Number,
    downVotes:Number,
    text:String
});

Comment.plugin(autoIncrement.plugin,{model:'Comment',field:'ProductImageId',startAt:1000});
module.exports = mongoose.model('Comment', Comment);