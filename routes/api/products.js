var express = require('express');
var router = express.Router();
var rek = require("rekuire");
var _ = require("lodash");
var Q = require("q");

//DB Object
var DB = rek('database');

/*
 *
 * Route Definitions
 *
 * */

router.get('/product/show/:id', showProduct);
router.put('/product/edit/:id', editProduct);
router.post('/product/create/:userId', createProduct);
router.delete('/product/remove/:id', deleteProduct);

/*
 *
 * Non restful routes
 *
 * */


router.put('/product/:productId/like/:userId', likeProduct);

/*
 *
 * Route functions
 * */
function showProduct(req, res) {
    res.send('respond with a resource');
};



function deleteProduct(req, res) {
    var input = req.params;

    var Product = DB.model('Product');
    //Operation
    Product.findOneAndRemove({productId: req.params.id}, function(err, doc){
        //do necessary check and respond with appropirate message
        if(err) return res.json(err, 404);
        if(!doc) return res.json({error: true, details: "No such Product "+input.id, errorObj: err}, 404);
        return res.json({error:false, message:"Product " + doc.toObject().productId + " removed successfully", flash:true});
    });
}

/*
*
*Put - host/product/edit/:productId
*
*
* */
function editProduct(req, res) {
    var input = req.params;
    data = _.omit(req.body, ['barcode']); //omit all unique fields

    var Product = DB.model('Product');
    //Operation
    Product.findOneAndUpdate({productId: req.params.id}, data, function(err, doc){
        //do necessary check and respond with appropirate message
        if(err) return res.json(err, 404);
        if(!doc) return res.json({error: true, details: "No such Product "+input.id, errorObj: err}, 404);
        return res.json(doc.toObject());
    });

}

function createProduct(req, res) {

    var input = req.body;

    //get model
    var Product = DB.model('Product');
    var User = DB.model('User');

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

            if(!user) return res.json({error: true, message: "not a user, please sign up/sign in"});
            if(!product) return res.json({error: true, message: "cannot like a non-existing product"});
            if (user && product) {
                Product.findOneAndUpdate({productId: product.productId}, {$addToSet: {likes: user._id}}, function (err, doc) {
                    if (err) res.json(err, 404);
                    if (!doc) res.json({error: true, message: "could not like this product for some unknown reason", errorObj: err})
                    return res.json(doc);
                });
            } else {
                return res.json({error: true, message: "not a user, please sign up"})
            }
        })

}


module.exports = router;