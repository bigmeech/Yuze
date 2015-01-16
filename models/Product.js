var rekuire = require("rekuire")
    mongoose = rekuire("database"),
    autoIncrement = require("mongoose-auto-increment"),
    Schema = mongoose.Schema,
    ObjectID = Schema.Types.ObjectId;

//TODO: Add a description field
//TODO: Add a current Sentiment field (Run through all comments and figure that out)
var Product = new Schema({
    productId:Number,
    creator:{type:ObjectID, ref:'User'},
    barcode:Object,
    name:String,
    description:String,
    sentiment:Number,
    creator:{type:ObjectID, ref:'User'},
    likes:[{type:ObjectID, ref:'User'}], //should juist be an array of users. Note you are either on this list or on the dislikes list
    dislikes:[{type:ObjectID, ref:'User'}], //should just be an array of users. Note you are either on this list or on the likes list
    followers:[{type:ObjectID, ref:'User'}], //should just be an array of users.
    comments:[{type:ObjectID, ref:'Comment'}]
});

Product.plugin(autoIncrement.plugin,{model:'Product',field:'productId',startAt:1000});
Product.index({name:1}, {unique:true, dropDups:true});
var ProductModel = mongoose.model('Product', Product);

/*
*
* Validations
*
* */

ProductModel.schema.path('name').validate(function(value){
    if(!value || value === "") return false
}, 'This field is required');

module.exports = ProductModel;