var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var submissionSchema = new Schema({
    name: String,
    email: String,
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);