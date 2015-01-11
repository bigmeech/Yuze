var express = require('express');
var router = express.Router();

/*
 *
 * Route Definitions
 *
 * */

router.get('/user/show/:id', showUsers);
router.put('/user/edit/:id', editUsers);
router.post('/user/create', createUsers);
router.delete('/user/remove/:id', deleteUsers);


/*
 *
 * Route functions
 * */
function showUsers(req, res){
  res.send('respond with a resource');
};

function deleteUsers(req, res){
  res.send('respond with a resource');
}

function editUsers(req, res){
  res.send('respond with a resource');
}

function createUsers(req, res){
  res.send('respond with a resource');
}



module.exports = router;