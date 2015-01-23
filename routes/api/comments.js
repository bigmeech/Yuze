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

router.get('/comments/show/:productId', showComments);
router.put('/comments/edit/:id', editComments);
router.post('/comments/:userId/create/:productId', createComments);
router.delete('/comments/remove/:id', deleteComments);
router.put('/comments/:id/uv/:userId', uvComment);
router.put('/comments/:id/dv/:userId', dvComment);


/*
 *
 * get Comments for specific product
 * Route Format get /comments/show/:productId
 *
 * */
function showComments(req, res) {
    var input = req.params;
    var Comment = DB.model("Comment");
    var Product = DB.model("Product");

    //first attempt to find the product and proceed with the comment operation else
    // die with a 404
    Product.findOne({productId: input.productId}, function (err, data) {
        if (err) return res.json(err, 404);
        if (!data) return res.json({error: true, message: "Cant get comments for a product that does NOT exist"});
        if (data) {
            Comment.find({productId: data.productId}, function (err, data) {
                if (err) return res.json(err, 404);
                if (data.length <= 0) return res.json({error: false, message: "No Comments for this product Yet"});
                return res.json(data);
            });
        }

    })
};


/*
 *
 *  You really cannot delete comments, you can only edit them
 *  Deleting them will technically make you loose points associated with it but we want you to gain points :)
 *  poeple can also cheat the system by deleting negative points for bad comments
 *
 * */
function deleteComments(req, res) {
    //input from client
    var input = req.params;
    var body = req.body;

    //models responsible
    var Comment = DB.model('Comment');
    var Product = DB.model('Product');

}

function editComments(req, res) {

    //input from client
    var input = req.params;
    var body = req.body;

    //models responsible
    var Comment = DB.model('Comment');
    var Product = DB.model('Product');

    //query
    var query = {commentId:input.id};
    Comment.findOneAndUpdate(query, body, function(err, newComment){
        if(err) return res.json(err, 404);
        if(!newComment) return res.json({error:true, message:"no such comments found"}, 404);
        return res.json(newComment.toObject());
    });


}

/*
 *
 * Up Vote Comment Operation - Works by just adding the user id to the Upvote list
 * i.e number of Upvotes is just a count of the number of users in the Upvotes array
 *
 * */

 function uvComment(req, res) {
     //input from client
     var input = req.params;
     var body = req.body;

     //models responsible
     var Comment = DB.model('Comment');
     var Product = DB.model('Product');
     var User = DB.model('User');

     //queries
     var userQuery = {userId:input.userId};
     var commentQuery = {id:input.id};
     User.findOne(userQuery, function(err, User){
         if(err) return res.json(err, 500);
         if(!User) return res.json({error:true, message:"no such user"}, 404);

         //adds user to upvotes array
         Comment.findOneAndUpdate(commentQuery,{$addToSet: {upVotes: User._id}}, function(err,newComment){
             if(err) return res.json(err, 500);
             if(!newComment) return res.json({eror:true, message:"no such comments found"});

             //removes user from downvotes array if it exists there
             Comment.findOneAndUpdate(commentQuery,{$pull:{downVotes:User._id}}, function(err, newCommentDv){
                 if(err) return res.json(err, 500);
                 if(!newComment) return res.json({eror:true, message:"no such comments found"});
                 return res.json(newCommentDv.toObject());
             });

         })
     });
}

/*
*
* Down Vote Comment Operation - Works by just adding the user id to the Down votes list
* i.e number of Down votes is just a count of the number of users in the Down votes array
*
* */
function dvComment(req, res) {
    //input from client
    var input = req.params;
    var body = req.body;

    //models responsible
    var Comment = DB.model('Comment');
    var Product = DB.model('Product');
    var User = DB.model('User');

    //queries
    var userQuery = {userId:input.userId};
    var commentQuery = {id:input.id};
    User.findOne(userQuery, function(err, User){
        if(err) return res.json(err, 500);
        if(!User) return res.json({error:true, message:"no such user"}, 404)
        Comment.findOneAndUpdate(commentQuery,{$addToSet: {downVotes: User._id}}, function(err,newComment){
            if(err) return res.json(err, 500);
            if(!newComment) return res.json({eror:true, message:"no such comments found"});

            //removes user from downvotes array if it exists there
            Comment.findOneAndUpdate(commentQuery,{$pull:{upVotes:User._id}}, function(err, newCommentUv){
                if(err) return res.json(err, 500);
                if(!newComment) return res.json({eror:true, message:"no such comments found"});
                return res.json(newCommentUv.toObject());
            });
        })
    });
}


/*
*
*
*
* */
function createComments(req, res) {
    var input = req.params;
    var body = req.body;


    var Comment = DB.model("Comment");
    var Product = DB.model("Product");

    //first attempt to find the product and proceed with the comment operation else
    // die with a 404
    Product.findOne({productId: input.productId}, function (err, data) {
        if (err) return res.json(err, 404);
        if (!data)
            return res.json({
                error: true,
                message: "Illegal Attempt to comment on a product that does NOT exist"
            });
        if (data) {

            var NewComment = new Comment();
            NewComment.text = body.text;
            NewComment.userId = input.userId;
            NewComment.productId = input.productId;

            NewComment.save(function (err, data) {
                if (err) return res.json(err, 404);
                if (data.length <= 0)
                    return res.json({error: false, message: "Could not find comment"});
                return res.json(data);
            });
        }

    })

}


module.exports = router;