var express = require('express');
var router = express.Router();

/*
 *
 * Route Definitions
 *
 * */

router.get('/search', doSearch);

/*
 *
 * Route functions
 * */
function doSearch(req, res){
    res.send('respond with a resource');
};

module.exports = router;