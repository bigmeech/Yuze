

var getAWSUrl = function(filename){
    var awsUrl = "https://"
        +config.aws['development'].server + "."
        +config.aws['development'].host + "/"
        +config.aws['development'].bucket+"/"
        +filename;

    return awsUrl;
}

module.exports = {
    getAWSUrl:getAWSUrl
}