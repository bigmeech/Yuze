var stream = require("stream");
var util = require("util");
var rek = require("rekuire");
var aws = require("aws-sdk");
var config = rek("config");

function UploadManager(file){

    aws.config.update({
        accessKeyId:config.aws['development'].accesskeyid,
        secretAccessKey:config.aws['development'].secretaccesskey
    });

    var params = {
        Bucket:config.aws['development'].bucket,
        ACL:'public-read',
        Body:file.buffer,
        Key:file.name
    };
    var S3 = new aws.S3();
    S3.putObject(params, function(err, data){
        console.log(err, data, "file uploaded");
    });
}

module.exports = UploadManager;