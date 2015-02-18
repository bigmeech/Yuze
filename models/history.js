/**
 * Created by john.nana on 2/14/2015.
 */
var rekuire = require("rekuire")
    mongoose = rekuire("database"),
    autoIncrement = require("mongoose-auto-increment"),
    Schema = mongoose.Schema,
    ObjectID = Schema.Types.ObjectId;

//
var History = new Schema({
    historyId: Number,
    points: Number,
    owner: {type:ObjectID, ref:'User'},
    flag:{type:Boolean, default: true}

});


History.plugin(autoIncrement.plugin,{model:'History',field:'historyId',startAt:1000});
var HistoryModel= mongoose.model('History', History);




History.post('save', function( doc){
         //get model
        var User = mongoose.model('User');
        //increment users point
        User.update({_id: doc.owner},{ $inc: { total_points: doc.points, num_likes: 1 }}, function(err, u_doc){
            if (!err) console.log('points incremented');
            if(err) console.log(err);
            console.log(u_doc);
        });



});



module.exports = HistoryModel;
