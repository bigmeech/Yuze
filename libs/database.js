var mongoose = require("mongoose"),
    mongooseTimestamps = require("mongoose-concrete-timestamps"),
    autoIncrement = require("mongoose-auto-increment"),
    config = require("../config"),
    Grid = require("gridfs-stream");

mongoose.connect( config.database['deploy'].url + "" + config.database['deploy'].name );
var db = mongoose.connection;
db.once('open', function(){
    var gfs = Grid(db, mongoose.mongo);
    mongoose.GridStore = mongoose.mongo.GridStore
});
db.on("error",function(errMsg){
    console.log("Error Connecting to Mongo: " + errMsg);
});
mongoose.set('debug', true);

mongoose.plugin(mongooseTimestamps);
autoIncrement.initialize(db);
module.exports = mongoose;