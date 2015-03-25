var dbarray = [];
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
var Video = require('./schemas/video')

Video.find({}, function(err, docs) {
    if (err) {
        console.log('error');
    }
    dbarray = docs;
})
setInterval(function() {
    var that = this

    Video.find({}, function(err, docs) {
        if (err) {
            console.log('error');
        }
        dbarray = docs;
        setTimeout(function() {
            that._onTimeout()
        }, 100)
    })
}, 10000);
module.exports = function() {
    console.log(dbarray)
    return dbarray
}