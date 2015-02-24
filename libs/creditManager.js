/**
 * Created by john.nana on 2/16/2015.
 */
var express = require('express');
var rek = require("rekuire");
var _ = require("lodash");
var config = rek('config');


//DB Object
var DB = rek('database');

var ObjectId = DB.Schema.Types.ObjectId;

/*router.post("/product/credit/:uid/:pointType", addCredit);*/
var POINT_TYPES = {
    LIKE:20,
    CREATE:100
};


function addCredit(req, res){

    var user = req.yuze.user;

    //get model
    var History = DB.model('History');
    var User = DB.model('User');

    User.findOne({userId: user.userId}, function(err, u_doc){
        if (err) return res.json(err, 404);
        if (!u_doc) return res.json({error: true, message: "User does not exist"}, 404);

        //construct document
        var h_doc ={owner: u_doc._id,
                    points: POINT_TYPES.LIKE };

        var history = new History(h_doc);

        history.save(function( err, h_doc){
            if (err) console.log("there was an error in saving history");
            if (!h_doc) console.log("history is not saved");

            return res.json(h_doc);
        })
     });

  }


module.exports = {
    POINT_TYPES:POINT_TYPES,
    addCredit:addCredit
}
