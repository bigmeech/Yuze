var rek = require("rekuire");
var config = rek('config');
var express = require('express');
var FacebookStrategy = require("passport-facebook").Strategy;
var passport = require("passport");
var DB = rek("database");


/*
*
* Passport serialization and deserializaation of user objects into session
*
*
* */

 passport.serializeUser(function(user, done){
    done(null, user)
});

passport.deserializeUser(function(obj, done){
    done(null, obj)
});

/*
 *
 * Facebook related login/signup
 *
 * */

module.exports = function (app) {

    /*
     *
     * Facebook Strategy Definition
     * --------------------------------
     * Sign Up ----> Yuze Server-----------> go to Facebook -----> get Facebook User data ------> Create local User Account adding facebook data to it
     * Sign IN ----> Yuze Server -----------> go to Facebook -----> get Facebook User data------> verify persisting facebook data with ours
     *
     * */

    passport.use(new FacebookStrategy({
        clientID: config.keys.facebook.clientID,
        clientSecret: config.keys.facebook.clientSecret,
        callbackURL: config.keys.facebook.callbackUrl
    }, function (accessToken, refreshToken, profile, done) {
        var LocalUserModel = DB.model('User');
        return done(null, profile);
    }));

    /*
    *
    * facebook login url
    * use scopes to tell passport the things you will like to retrieve from the oauth provider.
    *
    * */
    app.get(
        '/auth/facebook',
        passport.authenticate('facebook',{ scope: ['user_likes','email','user_friends']}),
        function (req, res) {/*
            this middleware will not be used since the request has been redirected to facebook servers
        */});

    app.get(
        '/auth/facebook/callback',
        passport.authenticate('facebook',{failureRedirect:'/login'}),
        function (req, res) {
            return res.json(req.session.passport.user);
        });
};