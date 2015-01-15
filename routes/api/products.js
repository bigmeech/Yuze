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
function showProduct(req, res){
    res.send('respond with a resource');
};

function deleteProduct(req, res){
    res.send('respond with a resource');
}

function editProduct(req, res){
    var input  = req.params;
    data = _.omit(req.body, ['email', 'facebookId']); //omit all unique fields

    var Product = DB.model('Product');
}

function createProduct(req, res){

    var input = req.body;

    //get model
    var Product = DB.model('Product');
    var User = DB.model('User');

    User.findOne({userId:req.params.userId}, function(err, User){

        //checks that all is good
        if(err) return res.json(err, 404);
        if(!User) return res.json({error:true, message:"Non Users cannot create product, signin or signup"}, 404);


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


function likeProduct(req, res){
    //get input from client
    var input = req.params;

    //get model
    var Product = DB.model('Product');
    var User = DB.model('User');


    //functions to call
    var getProduct = function(Product){
        return Product.findOne({productId:input.productId}).exec()
    };
    var getUser = function(User){
        return User.findOne({userId:input.userId}).exec();
    };

    Q.all([getProduct(Product), getUser(User)]).done(function(result){
        var product = result[0],
            user    = result[1];

        if(user){
            Product.findOneAndUpdate({productId:product.productId},{$addToSet:{likes:user._id}}, function(err, doc){
                if(err) res.json(err, 404);
                if(!doc) res.json({error:true, message:"cannot like a product that doesnt exist", errorObj:err})
                return res.json(doc);
            });
        }else{
            res.json({error:true, message:"not a user, please sign up"})
        }
    })

}


module.exports = router;