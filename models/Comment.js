var rekuire = require("rekuire")
mongoose = rekuire("database"),
    autoIncrement = require("mongoose-auto-increment"),
    Schema = mongoose.Schema,
    ObjectID = Schema.Types.ObjectId;


var Comment = new Schema({
    id: Number,
    userId: {type: Number, ref: 'User'},
    productId: {type: Number, ref: 'Product'},
    upVotes: [{type: ObjectID, ref: 'User'}],
    downVotes: [{type: ObjectID, ref: 'User'}],
    text: String
});

Comment.plugin(autoIncrement.plugin, {model: 'Comment', field: 'id', startAt: 1000});

/*
 *
 * this middeware adds a comment id to the products comments array so we can easily list comments for a product
 * Two ways to query for product comments
 * 1. get comments by querying the comments collection for comments that have the product ID
 * 2. get a product's comments array and get all the comments with that
 *
 * */


Comment.post('save', function (doc) {
    //we brought this here to avoid the pesky schema hasnt been registerd for "XXXX" error
    Product = mongoose.model('Product');
    Product.findOneAndUpdate({productId:doc.productId},{$addToSet:{comments:doc._id}}, function(err, product){
        if(err) return err;
        return;
    })
});
module.exports = mongoose.model('Comment', Comment);