var rekuire = require("rekuire")
    mongoose = rekuire("database"),
    autoIncrement = require("mongoose-auto-increment"),
    Schema = mongoose.Schema,
    ObjectID = Schema.Types.ObjectId;

//TODO: Add a description field
//TODO: Add a current Sentiment field (Run through all comments and figure that out)
var Product = new Schema({
    productId:Number,
    barcode:Object,
    name:String,
    description:String,
    sentiment:Number,
    awsurl:String,
    creator:{type:ObjectID, ref:'User'},
    likes:[{type:ObjectID, ref:'User'}], //should juist be an array of users. Note you are either on this list or on the dislikes list
    dislikes:[{type:ObjectID, ref:'User'}], //should just be an array of users. Note you are either on this list or on the likes list
    followers:[{type:ObjectID, ref:'User'}], //should just be an array of users.
    comments:[{type:ObjectID, ref:'Comment'}],
    tags:[]
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


Product.post('save', function (doc) {
    var User = mongoose.model('User');
    var ProductModel = mongoose.model('Product');
    User.findOne({_id:doc.creator}, function(err, user){
        if(err) throw err;
        ProductModel.findOneAndUpdate({productId:doc.productId},{$addToSet:{followers:user._id}}, function(err, product){
            if(err) return err;
            return product;
        })
    });/*
    Product.findOneAndUpdate({productId:doc.productId},{$addToSet:{followers:doc._id}}, function(err, product){
        if(err) return err;
        return;
    })*/
});

module.exports = ProductModel;