var stream = require("stream");
var util = require("util");
var rek = require("rekuire");
var aws = require("aws-sdk");
var config = rek("config");
var multer = require("multer");
var debug = require('debug')('Yuze')

function UploadManager(file){

    //configure aws
    aws.config.update({
        accessKeyId:config.aws['development'].accesskeyid,
        secretAccessKey:config.aws['development'].secretaccesskey
    });

    //request params
    var params = {
        Bucket:config.aws['development'].bucket,
        ACL:'public-read',
        Body:file.buffer,
        Key:file.name
    };
    var S3 = new aws.S3();
    S3.putObject(params, function(err, data){
        debug(": File successfully uploaded to Amazon S3")
    });
}

module.exports = UploadManager;