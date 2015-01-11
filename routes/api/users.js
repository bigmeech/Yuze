var express = require('express');
var router = express.Router();
var rek = require("rekuire");
var _ = require("lodash");

//models
var DB = rek('database');

/*
 *
 * Route Definitions
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
 * @req - Client Request
 * @res - Server Response
 *
 * */

function deleteUsers(req, res) {
    res.send('respond with a resource');
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
    User.findOne({userId: input.id})
        .exec()
        .then(function(User) {
            for(var prop in data){
                User[prop] = data[prop]
            }
            User.save(function(err, data){
                if(err) return res.json(err, 404);
                return res.json(data)
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