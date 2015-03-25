var mongoose = require('mongoose');
var Video = mongoose.model('Video', {
	videoId: String,
	metadata: String
});

module.exports = Video