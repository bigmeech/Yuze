var rek = require("rekuire");
var config = rek('config');
var express = require('express');
var FacebookStrategy = require("passport-facebook").Strategy;
var passport = require("passport");
var DB = rek("Database");
var LocalUserModel = DB.model('User')
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
     * facebook strategy definition
     * TODO: Serialize/Deserialize user into session to complete
     * */

    passport.use(new FacebookStrategy({
        clientID: config.keys.facebook.clientID,
        clientSecret: config.keys.facebook.clientSecret,
        callbackURL: config.keys.facebook.callbackUrl
    }, function (accessToken, refreshToken, profile, done) {
        LocalUserModel.
        console.log(arguments);
        return done(null, profile);
    }));

    app.get(
        '/auth/facebook',
        passport.authenticate('facebook'),
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