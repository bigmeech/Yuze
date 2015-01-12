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
    likes:[{type:ObjectID, ref:'User'}], //should juist be an array of users. Note you either either on this list or on the dislikes list
    dislikes:[{type:ObjectID, ref:'User'}], //should just be an array of users. Note you either either on this list or on the likes list
    followers:[{type:ObjectID, ref:'User'}],
    comments:[{type:ObjectID, ref:'Comment'}]
});

Product.plugin(autoIncrement.plugin,{model:'Product',field:'productId',startAt:1000});
Product.index({likes:1}, {unique:true, dropDups:true})
Product.plugin(findOrCreate);
module.exports = mongoose.model('Product', Product);