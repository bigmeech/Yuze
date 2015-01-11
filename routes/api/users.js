var express = require('express');
var router = express.Router();
var rek = require("rekuire");

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
function showUsers(req, res){
  //get input from client
  var input = req.params;

  //get model
  var User = DB.model('User');

  //execute operation
  User.find(input,function(err, result){
    if(err) throw new err
    res.json(result);
  });
};

function deleteUsers(req, res){
  res.send('respond with a resource');
}

function editUsers(req, res){
  //get input from client
  var input = req.body;

  //get model
  var user = DB.model('User');


}

function createUsers(req, res){
  //get input from client
  var input = req.body;

  //get model
  var user = DB.model('User');
  var User = new user();

  //do operation
  for(var prop in input){
    User[prop] = input[prop];
  }
  User.save(function(err, User){
    if(err) res.json(err, 404);
    res.json(User);
  })
}



module.exports = router;