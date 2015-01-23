var express = require('express');
var router = express.Router();
var rek = require("rekuire");
var _ = require("lodash");

//DB Object
var DB = rek('database');

/*
 *
 * Route Definitions
 * -----------------------------------------
 * Show - Get request to /user/show/<userId>
 * Edit - Put request to /user/edit/<userId>
 * Create - post request to /user/create
 * delete - delete request to /user/remove/<userId>
 *
 * Todo:Need to find a way to make this CRUD more centralised, so i dont have to reinvewnt this wheel for every route/controller
 *
 * */

//CRUD Routes
router.get('/user/show/:id', showUsers);
router.put('/user/edit/:id', editUsers);
router.post('/user/create', createUsers);
router.delete('/user/remove/:id', deleteUsers);

/*
 *
 * Route functions
 * Do Model Operations inside the below callbacks, this is because outside these callbacks,
 * the database still hasnt gotten any information regarding registered models
 *
 * */
function showUsers(req, res) {
    //get input from client
    var input = req.params;

    //get model
    var User = DB.model('User');

    //execute operation
    User.find(input, function (err, result) {
        if (err) throw new err
        return res.json(result);
    });
};

/*
 *
 * Edit user Operation - Edits using skipping all unique indexes
 * @req - Received Client Request
 * @res - Unsent Server Response
 *
 * */

function deleteUsers(req, res) {
    //get input from client
    var input = req.params;

    //get model
    var User = DB.model('User');

    //Operation
    User.remove({userId: input.id}, function (err) {
        if (err) return res.json({error: true, details: "invalid user", errorObj: err}, 404);
        return res.json({message: "User account deleted successfully!"})
    });

}

/*
 *
 * Edit user Operation - Edits using skipping all unique indexes
 * @req - Client Request
 * @res - Server Response
 *
 * */
function editUsers(req, res) {
    //get input from client
    var input = req.params,
        data = _.omit(req.body, ['email', 'facebookId']); //omit all unique fields

    //get model
    var User = DB.model('User');

    //Operation
    User.findOne({userId: input.id}, function(err, doc){
        //do necerassry check and respond with appropirate message
        if(err) return res.json(err, 404);
        if(!doc) return res.json({error: true, details: "No such user "+input.id, errorObj: err}, 404);

        var user = doc.toObject();
        for (var prop in user) {
            doc[prop] = data[prop]
        }

        doc.save(function (err, userData) {
            if (err) return res.json(err, 404);
            return res.json(userData);
        })
    });
}


/*
 *
 * Create user Operation - Creates new User
 * @req - Client Request
 * @res - Server Response
 *
 * */

function createUsers(req, res) {
    //get input from client
    var input = req.body;

    //get model
    var user = DB.model('User');
    var User = new user();

    //do operation
    for (var prop in input) {
        User[prop] = input[prop];
    }
    User.save(function (err, User) {
        if (err) return res.json(err, 404);
        return res.json(User);
    })
}


module.exports = router;