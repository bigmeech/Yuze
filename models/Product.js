var rekuire = require("rekuire")
    mongoose = rekuire("database"),
    autoIncrement = require("mongoose-auto-increment"),
    findOrCreate = require("mongoose-findorcreate"),
    Schema = mongoose.Schema,
    ObjectID = Schema.Types.ObjectId;

var Product = new Schema({
    productId:Number,
    creator:{type:ObjectID, ref:'User'},
    barcode:Object,
    name:String,
    likes:Number,
    dislikes:Number,
    followers:[{type:ObjectID, ref:'User'}],
    comments:[{type:ObjectID, ref:'Comment'}]
});

Product.plugin(autoIncrement.plugin,{model:'Product',field:'productId',startAt:1000});
Product.plugin(findOrCreate);
module.exports = mongoose.model('Product', Product);