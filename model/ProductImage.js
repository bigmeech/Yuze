var mongoose = require("../lib/database"),
    autoIncrement = require("mongoose-auto-increment"),
    Schema = mongoose.Schema,
    ObjectID = Schema.Types.ObjectID;

var ProductImage = new Schema({
    productImageId:Number,
    barcode:Object,
    image:{data:Buffer, contentType:String}
});

ProductImage.plugin(autoIncrement.plugin,{model:'ProductImage',field:'ProductImageId',startAt:1000});
module.exports = mongoose.model('ProductImage', ProductImage);