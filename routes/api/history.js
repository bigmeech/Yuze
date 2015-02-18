/**
 * Created by john.nana on 2/16/2015.
 */
var express = require('express');
var router = express.Router();
var rek = require("rekuire");
var _ = require("lodash");
var config = rek('config');


//DB Object
var DB = rek('database');

var ObjectId = DB.Schema.Types.ObjectId;

router.post("/product/credit/:uid/:pointType", addCredit);



function addCredit(req,res){
    var input = req.params;

    var uid = input.uid;
    var pointType = input.pointType;
    var points;

    if(pointType == 'like') points = 2;
    if(pointType =='create') points =100;

    //get model
    var History = DB.model('History');
    var User = DB.model('User');

    User.findOne({userId: uid}, function(err, u_doc){
        if (err) return res.json(err, 404);
        if (!u_doc) return res.json({error: true, message: "User does not exist"}, 404);

        //construct document
        var h_doc ={owner: u_doc._id,
                    points: points };

        var history = new History(h_doc);

        history.save(function( err, h_doc){
            if (err) console.log("there was an error in saving history");
            if (!h_doc) console.log("history is not saved");

            return res.json(h_doc);
        })
     });

  }


module.exports = router;
