var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var submissionSchema = new Schema({
    artist: String,
    message: String,
    website: String,
    links: [String],
    contact: {
        name: String,
        email: String
    },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);