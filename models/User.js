var rekuire = require("rekuire")
    mongoose = rekuire("database"),
    autoIncrement = require("mongoose-auto-increment"),
    crypto = require("crypto"),
    Schema = mongoose.Schema,
    ObjectID = Schema.Types.ObjectID;

var User = new Schema({
    username:String,
    userId: Number,
    first_name: String,
    last_name: String,
    hash: String,
    email: {type: String, index: {unique: true}},
    facebookId: {type: String, index: {unique: true}},
    twitterId: {type: String, index: {unique: true}}
});
User.plugin(autoIncrement.plugin, {model: 'User', field: 'userId', startAt: 1000});


User.virtual("password").get(function () {
    return this.hash;
});

User.virtual("password").set(function (password) {
    var passwordhash = crypto
        .createHash("sha1")
        .update(password)
        .digest('hex');
    this.hash = passwordhash;
});

User.virtual("id").get(function(){
    return this.facebookId
});

User.virtual("id").set(function(id){
    this.facebookId = id;
});
module.exports = mongoose.model('User', User);
