var express = require('express');
var router = express.Router();

/*
 *
 * Route Definitions
 *
 * */

router.get('/products/show/:id', showProduct);
router.put('/products/edit/:id', editProduct);
router.post('/products/create', createProduct);
router.delete('/products/remove/:id', deleteProduct);


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
    res.send('respond with a resource');
}

function createProduct(req, res){
    res.send('respond with a resource');
}



module.exports = router;