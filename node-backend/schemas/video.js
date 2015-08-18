var mongoose = require('mongoose');
var Video = mongoose.model('Video', {
	videoId: String,
	metadata: String,
	genre: String
});

module.exports = Video