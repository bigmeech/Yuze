/*
 *
 * This file dynamically loads all the route files in thbe route folder
 * and handle route errors too
 *
 *
 * */

var fs = require("fs");
var path = require("path");
var app = require("express")();
var _ = require("lodash");

var routelist = [];

/*
 *
 *  Loop through the files requiring everything in its path,
 *  if it meets a folder, recurse the method again. Every
 *  controller should extend ControllerBase since they are
 *  all just decorations of it.
 *
 *
 * */

var readDir = function (dir, app) {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(function (file) {
            var filePath = path.join(dir, file);
            if (filePath.match(/\.js$/)) {
                var route = require("../" + filePath);
                createRoute(route.name, route.permissions);
            }
            if (fs.lstatSync(filePath).isDirectory()) {
                return readDir(filePath, app)
            }
        })
    }
};

/*
*
* Bare Base controller
*
* */
function BaseController(){
    var defaultPermissions = {};
    var defaultOptions = {
        path:"../controllers"
    };
}

/*
*
*
* Creates a controller and adds it to the list of controllers
* @name         [string] - name of controller
* @permissions  [object] - object containing actions that the controller can take
* @options      [object] - options for the controller during creation
*
*
* */

BaseController.prototype.create = function(name, _permissions, _options){
    if(name){
        var permissions = _.merge(this.defaultPermissions, _permissions),
            options = _.merge(this.defaultOptions, _options)
    }
    else throw new Error("controllers need names too!");
};


BaseController.prototype.getPermissions = function(name){
    return list[name].permission;
};

/*
 *
 * Create Routes in the format
 * createOne -       POST to site/resource/create
 * ViewAll -         Get to site/resource/show
 * ViewOne -         Get to site/resource/:id
 * EditOne -         Put to site/resource/:id
 * Delete            Delete to site/resource/:id
 *
 *
 *
 *
 *
 * */

BaseController.prototype.generateRoutes = function (name){
    //actions that can be performed on routes
    var actions = {
    }


    var createAction = function(routeName){
    }
    actions.forEach(function(action){
    })
}

module.exports = {
    Controller:new BaseController()
}