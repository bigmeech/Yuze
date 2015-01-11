var express = require('express');
var router = express.Router();

/*
*
* Route Definitions
*
* */

router.get('/comments/show/:id', showComments);
router.put('/comments/edit/:id', editComments);
router.post('/comments/create', createComments);
router.delete('/comments/remove/:id', deleteComments);


/*
*
* Route functions
* */
function showComments(req, res){
    res.send('respond with a resource');
};

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