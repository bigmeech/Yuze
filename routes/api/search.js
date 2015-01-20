var express = require('express');
var router = express.Router();
var rek = require("rekuire");
var _ = require("lodash");

//DB Object
var DB = rek('database');

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