var gulp = require("gulp");
var rek = require("rekuire");
var seedr = rek("gulp-mongoose-seed")

//DB Object
var DB = rek('database');

gulp.task('default', function(){
    console.log('default task just ran');
});

gulp.task("seed", function(){
    console.log("Running Db Queries");
    return seedr(DB)
});