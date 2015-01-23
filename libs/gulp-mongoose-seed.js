var fs = require("fs");
var mongoose = require("mongoose");
var path = require("path");

function Seed(options) {
    return this;
}

/*
 *
 * Usage:
 * Seed.init({optionsObject})
 *     .collection()
 *     .with({data})
 *     .run();
 *
 * */

Seed.prototype.init = function (options) {
    if (!options.dbName) {
        throw new Error("Seeder needs a database name");
        return
    }
    this.dbName = options.dbName;
    this.connection = mongoose.createConnection("mongodb://localhost:27017/" + options.dbName)
    return this;

};

/*
 *
 * Should execute queries put together by collection and with methods
 *
 * */
Seed.prototype.run = function () {

};

module.exports = Seed;