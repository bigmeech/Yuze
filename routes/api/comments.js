var express = require('express');
var router = express.Router();
var rek = require("rekuire");
var _ = require("lodash");

//DB Object
var DB = rek('database');

/*
*
* Route Definitions
*
* */

router.get('/comments/show/:productId', showComments);
router.put('/comments/edit/:id', editComments);
router.post('/comments/create', createComments);
router.delete('/comments/remove/:id', deleteComments);


/*
*
* get Comments for specific product
* Route Format get /comments/show/:productId
*
* */
function showComments(req, res){
    var input = req.params;
    var Comment = DB.model("Comment");
    var Product = DB.model("Product");

    //first attempt to find the product and proceed with the comment operation else
    // die with a 404
    Product.findOne({productId:input.productId}, function(err, data){
        if(err) return res.json(err, 404);
        if(!data) return res.json({error:true, message:"Illegal Attempt to comment on a product that does NOT exist"});
        if(data){
            Comment.find({productId:data.productId}, function(err, data){
                if(err) return res.json(err, 404);
                if(data.length <= 0) return res.json({error:false,message:"No Comments for this product Yet"});
                return res.json(data);
            });
        }

    })
};


/*
*
*  You really cannot delete comments, you can only edit them
*
* */
function deleteComments(req, res){
    res.send('respond with a resource');
}

function editComments(req, res){
    res.send('respond with a resource');
}

function createComments(req, res){
    res.send('respond with a resource');
}



module.exports = router;