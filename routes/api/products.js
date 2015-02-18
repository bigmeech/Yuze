var express = require('express');
var router = express.Router();
var rek = require("rekuire");
var _ = require("lodash");
var Q = require("q");
var config = rek('config');
var multer = require("multer");
var commonFn = rek("common");

//DB Object
var DB = rek('database');

var ObjectId = DB.Schema.Types.ObjectId;
var UploadManager = rek("uploadManager");
var uploadOptions = {inMemory:true, onFileUploadComplete: UploadManager};

/*
 *hhhh
 * Route Definitions
 *
 * */

router.get('/products/show/:id', showProduct);
router.put('/products/edit/:id', editProduct);
router.post('/products/create/:userId', createProduct);
router.delete('/products/remove/:id', deleteProduct);

/*
 *
 * Non-CRUD route definitions
 *
 * */

router.put('/products/:productId/like/:userId', likeProduct);
router.put('/products/:productId/follow/:userId', followProduct);
router.get('/products/getTags/:productId/:tag', showProductsWithTags);
router.post('/products/:productId/images/', multer(uploadOptions), uploadImageResponse);

/*
 *
 * Read Operation
 * Route functions
 *
 * */

function showProduct(req, res) {
    var input = req.params;

    var Product = DB.model("Product");

    Product.findOne({productId: input.id}, function (err, doc) {
        if (err) return res.json(err);
        if (!doc) return res.json({error: true, message: "No Such product found"}, 404);
        return res.json(doc);
    })
};


/*
*
* Shows product contain certain tags
*
* */


function showProductsWithTags(req, res){
    var input = req.params;

    var Product = DB.model("Product");

    Product.find({tags: {$in:[input.tag]}}, function (err, doc) {
        if (err) return res.json(err);
        if (!doc) return res.json({error: true, message: "No Such product found"}, 404);
        return res.json(doc);
    })
}
/*
 *
 * Delete Operation
 *
 *
 *
 * */

function deleteProduct(req, res) {
    var input = req.params;

    var Product = DB.model('Product');
    //Operation
    Product.findOneAndRemove({productId: req.params.id}, function (err, doc) {
        //do necessary check and respond with appropirate message
        if (err) return res.json(err, 404);
        if (!doc) return res.json({error: true, details: "No such Product " + input.id, errorObj: err}, 404);
        return res.json({
            error: false,
            message: "Product " + doc.toObject().productId + " removed successfully",
            flash: true
        });
    });
}

/*
 *
 * Edit Operation
 * Put - host/product/edit/:id
 *
 * */

function editProduct(req, res) {
    var input = req.params;
    data = _.omit(req.body, ['barcode']); //omit all unique fields

    var Product = DB.model('Product');
    //Operation
    Product.findOneAndUpdate({productId: req.params.id}, data, function (err, doc) {
        //do necessary check and respond with appropirate message
        if (err) return res.json(err, 404);
        if (!doc) return res.json({error: true, details: "No such Product " + input.id, errorObj: err}, 404);
        return res.json(doc.toObject());
    });

}

/*
 *
 *  Create Operation
 *
 * */

function createProduct(req, res) {

    var input = req.body;

    //get model
    var Product = DB.model('Product');
    var User = DB.model('User');

    //process tags
    input.tags = input.tags
        .split(', ')
        .map(function(tag){
            return tag.toLowerCase();
        });

    User.findOne({userId: req.params.userId}, function (err, User) {

        //checks that all is good
        if (err) return res.json(err, 404);
        if (!User) return res.json({error: true, message: "Non Users cannot create product, signin or signup"}, 404);


        var product = new Product();

        //add creator id to input
        input.creator = User._id;

        //do operation
        for (var prop in input) {
            product[prop] = input[prop];
        }
        product.save(function (err, prdct) {
            if (err) return res.json(err, 404);
            return res.json(prdct);
        })
    })


}


/*
 *
 * Adds A like to product
 *
 * */


function likeProduct(req, res) {
    //get input from client
    var input = req.params;

    //get model
    var Product = DB.model('Product');
    var User = DB.model('User');


    //functions to call
    var getProduct = function (Product) {
        return Product.findOne({productId: input.productId}).exec()
    };
    var getUser = function (User) {
        return User.findOne({userId: input.userId}).exec();
    };

    Q.all([getProduct(Product), getUser(User)])
        .done(function (result) {
            var product = result[0],
                user = result[1];

            if (!user) return res.json({error: true, message: "not a user, please sign up/sign in"});
            if (!product) return res.json({error: true, message: "cannot like a non-existing product"});
            if (user && product) {
                Product.findOneAndUpdate({productId: product.productId}, {$addToSet: {likes: user._id}}, function (err, doc) {
                    if (err) res.json(err, 404);
                    if (!doc) res.json({
                        error: true,
                        message: "could not like this product for some unknown reason",
                        errorObj: err
                    })
                    return res.json(doc);
                });
            } else {
                return res.json({error: true, message: "not a user, please sign up"})
            }
        })
}


function followProduct(req, res){
    //get input from client
    var input = req.params;

    //get model
    var Product = DB.model('Product');
    var User = DB.model('User');


    //functions to call
    var getProduct = function (Product) {
        return Product.findOne({productId: input.productId}).exec()
    };
    var getUser = function (User) {
        return User.findOne({userId: input.userId}).exec();
    };

    Q.all([getProduct(Product), getUser(User)])
        .done(function (result) {
            var product = result[0],
                user = result[1];

            if (!user) return res.json({error: true, message: "not a user, please sign up/sign in"});
            if (!product) return res.json({error: true, message: "cannot follow a non-existing product"});
            if (user && product) {
                Product.findOneAndUpdate({productId: product.productId}, {$addToSet: {followers: user._id}}, function (err, doc) {
                    if (err) res.json(err, 404);
                    if (!doc) res.json({
                        error: true,
                        message: "could not follow this product for some unknown reason",
                        errorObj: err
                    })
                    return res.json(doc);
                });
            } else {
                return res.json({error: true, message: "not a user, please sign up"})
            }
        })
}

//TODO: find a better way to handle upload during request
/*function uploadDone(file) {
    var options = {
        name:file.name,
        mode:"w+",
        content_type:file.mimetype,
        w: "majority",
        metadata:file
    };

    var GridStore = new DB.GridStore(DB.connection, file.name, "w+", options);
    GridStore.open(function(err, GSStream){
        if(err) throw err;
        return GSStream.write(file.buffer, function(err, fileStream){
            console.log("file written");
            if(err) throw err;
            fileStream.close(function(err, result){
                if(err) throw err
                console.log(result);
            })

        })
    });
}*/


//here we are assuming the upload was successful and
function uploadImageResponse(req, res) {
    var input = req.params;
    var file = req.files.productImage;
    var awsUrl = commonFn.getAWSUrl(file.name);
    var Product = DB.model('Product');

    Product.findOneAndUpdate({productId:input.productId},{awsurl:awsUrl}, function(err, newData){
        if(err) return res.json(err,404);
        return res.json(newData);
    });

}

//helpers

module.exports = router;