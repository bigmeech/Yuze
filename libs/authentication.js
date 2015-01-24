var rek = require("rekuire");
var config = rek('config');
var express = require('express');
var FacebookStrategy = require("passport-facebook").Strategy;

/*
 *
 * Facebook related login/signup
 *
 * */


module.exports = function (app, passport) {

    /*
     *
     * facebook strategy definition
     *
     * */

    passport.use(new FacebookStrategy({
        clientID: config.keys.facebook.clientID,
        clientSecret: config.keys.facebook.clientSecret,
        callbackURL: config.keys.facebook.callbackUrl
    }, function (accessToken, refreshToken, profile, done) {
        console.log(arguments);
        return done(null, profile);
    }));

    app.get(
        '/auth/facebook',
        passport.authenticate('facebook'),
        function (req, res) {
            console.log(req, res)
        });
};