var stream = require("stream");
var util = require("util");
var rek = require("rekuire");
var aws = require("aws-sdk");
var config = rek("config");

//var onUploadDone = ;

function UploadManager(file){

    //make api keys for you account known.
    aws.config.update({
        accessKeyId:config.aws['development'].accesskeyid,
        secretAccessKey:config.aws['development'].secretaccesskey
    });

    var s3_params = {
        Bucket:config.aws['development'].bucket,
        ACL:'public-read'
    };
    var S3 = new aws.S3();
    s3_params.Key = file.originalname;
    S3.getSignedUrl('putObject', s3_params, function(err, data){
        console.log(err, data);
    });
}

module.exports = UploadManager;