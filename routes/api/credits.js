var express = require('express');
var router = express.Router();

/*
 *
 * Route Definitions
 *
 * */

router.get('/credits/show/:id', showCredit);

/*
 *
 * Route functions
 *
 * showCredit - we can only show you credits. Other credit
 *              related operations only happen internally based on events
 *
 * */
function showCredit(req, res){
    res.send('respond with a resource');
};
module.exports = router;