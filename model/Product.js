var mongoose = require("../lib/database"),
    autoIncrement = require("mongoose-auto-increment"),
    findOrCreate = require("mongoose-findorcreate"),
    Schema = mongoose.Schema,
    ObjectID = Schema.Types.ObjectID;

var Product = new Schema({
    productId:Number,
    creator:{type:Schema.Types.ObjectId, ref:'User'},
    barcode:Object,
    name:String,
    likes:Number,
    dislikes:Number,
    followers:[User],
    comments:[Comment]

});
Product.plugin(autoIncrement.plugin,{model:'Product',field:'productId',startAt:1000});
Product.plugin(findOrCreate);
module.exports = mongoose.model('Product', Product);