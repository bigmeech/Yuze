var rekuire = require("rekuire")
    mongoose = rekuire("database"),
    autoIncrement = require("mongoose-auto-increment"),
    crypto = require("crypto"),
    Schema = mongoose.Schema,
    ObjectID = Schema.Types.ObjectID;

var User = new Schema({
    userId: Number,
    firstname: String,
    lastname: String,
    hash: String,
    email: {type: String, index: {unique: true}},
    facebookId: {type: String, index: {unique: true}}
});
User.plugin(autoIncrement.plugin, {model: 'User', field: 'userId', startAt: 1000});


User.virtual("password").get(function () {
    return this.hash;
})

User.virtual("password").set(function (password) {
    var passwordhash = crypto
        .createHash("sha1")
        .update(password)
        .digest('hex');
    this.hash = passwordhash;
})
module.exports = mongoose.model('User', User);
