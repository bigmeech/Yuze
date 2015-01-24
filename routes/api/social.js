var express = require('express');
var router = express.Router();
//var config = require('./oauth.js');
var rek = require("rekuire");
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google').Strategy;

//DB Database
var DB = rek('database');

/*
 *
 * Route Definitions
 *
 * */

router.get('/social/facebook', facebookLogin);
router.put('/social/twitter', twitterLogin);
router.put('/social/google', googleLogin);


/*
 *
 *
 *   Facebook Login
 *
 * */
function facebookLogin(req,res){
    res.send('Respond with status')
}

/*
 *
 *  Twitter Login
 *
 *
 * */
function twitterLogin(req,res){
    res.send('Respond with status')
}


/*
 *
 *  Google Login
 *
 *
 * */
function googleLogin(req,res){
    res.send('Respond with status')
}



module.exports = router;